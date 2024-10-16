import React, {
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { ThemeContext } from 'styled-components';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';

import * as S from './styles';

interface FormData {
  email?: string;
  password: string;
}

interface UserData {
  email: string;
  password: string;
}

interface ErrorFormat {
  code: string;
  details: string | null;
  message: string;
}

interface ResponseError {
  error: ErrorFormat;
}

interface ServerError {
  response: {
    data: ResponseError;
    status: number;
  };
}

type LogInEmailProps = {
  email: string;
  next?: string;
  flow?: string;
};

const LoginEmail: React.FC = () => {
  const route = useRoute();
  const params = route?.params as LogInEmailProps;
  const { email } = params;
  const next = params ? params?.next : 'Home';

  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const formRef = useRef<FormHandles>(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

  const { logEvent } = useAction();

  const { signInOld } = useAuth();

  const enableButton = () => {
    setButtonVisible(false);
  };

  const validateForm = async (data: FormData): Promise<boolean> => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string(),
        password: Yup.string().min(6, 'Mínimo de 6 caracteres'),
      });

      await schema.validate(data, { abortEarly: false });

      return true;
    } catch (error) {
      const err = getValidationErrors(error);

      formRef.current?.setErrors(err);

      return false;
    }
  };

  async function usersVerify({ password }: UserData): Promise<boolean> {
    const isValid = await validateForm({ email, password });
    if (isValid) {
      try {
        const data = await signInOld({ email, password });
        const {
          user: { verified, id },
        } = data;
        if (!verified) {
          navigation.navigate('UpdateRequest', { id, next });
          return false;
        }
        navigation.dispatch(CommonActions.navigate('Home'));
        navigation.navigate(next, { next });
        return true;
      } catch (error) {
        if (error && error.response) {
          const apiError = error as ServerError;
          const {
            response: {
              data: {
                error: { message },
              },
            },
          } = apiError;
          formRef.current?.setErrors({
            email: message,
            password: message,
          });
        }
        return false;
      }
    }
    return false;
  }

  const handleSubmit = useCallback(async (data: UserData) => {
    setLoading(true);
    const isValid = await validateForm(data);
    if (isValid) {
      const response = await usersVerify(data);
      if (response) {
        navigation.navigate(next, { next });
        setLoading(false);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'signin',
      group: 'scrn',
      context: 'login-email',
      section: 'page',
      description: 'Login with eMail and password',
      userId: '0',
    });
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          Para continuar, faça seu login utilizando a sua senha.
        </S.Title>
        <S.FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="times-circle"
              enableButton={enableButton}
              defaultValue={email}
            />
            {/* <S.Separator /> */}
            <Input
              ref={passwordInputRef}
              name="password"
              icon="times-circle"
              placeholder="Senha"
              enableButton={enableButton}
              isPassword
            />
          </Form>
        </S.FormContainer>
      </S.Content>

      <S.ButtonContainer>
        <S.ForgotButton onPress={() => {}}>
          <S.ForgotPassWordText>Esqueci minha senha</S.ForgotPassWordText>
          <Icon
            name="chevron-right"
            size={20}
            color={theme.colors.colorTextNotRecivedCode}
          />
        </S.ForgotButton>

        <Button
          disable={buttonVisible}
          onPress={() => formRef.current?.submitForm()}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.colorTextButton}
            />
          ) : (
            'Continuar'
          )}
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default LoginEmail;
