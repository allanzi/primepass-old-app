/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  useRoute,
  RouteProp,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import { ThemeContext } from 'styled-components';

import Input from '../../../../components/Input';
import InputMask from '../../../../components/InputMask';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import getValidationErros from '../../../../utils/getValidationErrors';
import { AuthConfigType, useAuth } from '../../../../hooks/auth';
import { useAction } from '../../../../hooks/actions';
import * as S from './styles';

interface FormData {
  input: string;
  name: string;
}

type RegisterParams = {
  Params: {
    inputType: string;
    token: string;
    socialSignUp: any;
    partnerSignUp?: any;
    next?: string;
    flow?: string;
    authConfig: AuthConfigType;
  };
};

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {
    partnerSignUp,
    verify,
    verifyLogin,
  } = useAuth();
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RegisterParams, 'Params'>>();
  const { inputType, token, next } = params;
  const { email, phone, type: pinCodeType } = params.authConfig;
  const theme = useContext(ThemeContext);
  const { logEvent, logUserRegister } = useAction();
  const [loading, setLoading] = useState(false);
  const flow = 'signup';

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'signup',
      group: 'scrn',
      context: 'register',
      description: 'Register',
      userId: '0',
    });

    if (params?.socialSignUp) {
      formRef.current?.setData({
        name: params.socialSignUp.name,
        input: params.socialSignUp.email,
      });
    }
  }, []);

  const validateForm = useCallback(async (type: string, data: FormData) => {
    try {
      let schema = null;

      if (type === 'email') {
        schema = Yup.object().shape({
          name: Yup.string().min(3, 'Mínimo 3 caracteres'),
          input: Yup.string()
            .min(11, 'Informe um telefone válido')
            .max(14, 'Informe um telefone válido')
            .required('O Telefone é obrigatório'),
        });
      } else {
        schema = Yup.object().shape({
          name: Yup.string().min(3, 'Mínimo 3 caracteres'),
          input: Yup.string()
            .email('Informe um email válido')
            .required('O Email é obrigatório'),
        });
      }
      await schema.validate(data, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      const errors = getValidationErros(error);
      formRef.current?.setErrors(errors);
      return false;
    }
  }, []);

  const handleSubmit = useCallback(async ({ input, name }: FormData) => {
    setLoading(true);
    const inputFormatted = inputType === 'email' ? `+55${input.replace(/[^0-9]/g, '')}` : input;
    const isValid = await validateForm(inputType, { name, input: inputFormatted });

    if (!isValid) {
      return;
    }

    try {
      const response = await verifyLogin(
        inputType === 'phone' ? 'email' : 'phone',
        inputFormatted,
      );
      if (response.found === true) {
        formRef.current?.setFieldError(
          'input',
          `${inputType === 'phone' ? 'E-mail' : 'Telefone'} já utilizado`,
        );
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      formRef.current?.setFieldError('input', error.message);
      throw new Error(error.message);
    }
    if (isValid) {
      try {
        let response = {} as any;

        if (params?.partnerSignUp) {
          response = await partnerSignUp({
            name,
            email: inputType === 'email' ? email : input,
            phone: inputType === 'phone' ? phone : inputFormatted,
            partner_type: params.partnerSignUp.partner_type,
            partner_token: token,
          });
          if (!response) {
            navigation.navigate('AccessNotFound');
          }
        } else {
          const responseVerify = await verify('primepass', {
            email: inputType === 'email' ? email : input,
            phone: inputType === 'phone' ? phone : inputFormatted,
            sendType: false,
          });

          navigation.navigate('ValidationCode', {
            flow,
            next,
            socialSignUp: params?.socialSignUp,
            partnerSignUp: params?.partnerSignUp,
            authConfig: {
              type: responseVerify.type,
              email: inputType === 'email' ? email : input,
              phone: inputType === 'phone' ? phone : inputFormatted,
              name,
            },
          });
          return;
        }

        if (response) {
          const { id } = response.user;
          logUserRegister({ id, name, email });
          navigation.dispatch(CommonActions.navigate('Welcome'));

          if (params?.partnerSignUp) {
            navigation.navigate('ValidatedAccess');
            return;
          }

          if (params?.socialSignUp) {
            navigation.navigate('Home');
            return;
          }
        }
      } catch (error) {
        Alert.alert('Opps, algo deu errado, tente mais tarde');
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <S.Container>
      <Header title="Boas-vindas à Primepass" />
      <S.FormContainer>
        <S.TextRegisterTitle>
          {`Para continuar, poderia nos dizer qual o seu nome e seu ${
            inputType === 'phone' ? 'e-mail' : 'telefone'
          }?`}
        </S.TextRegisterTitle>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="name"
            placeholder="Nome completo"
            icon="times-circle"
          />
          {inputType === 'phone' ? (
            <Input
              label="E-mail"
              name="input"
              placeholder="Seu e-mail"
              icon="times-circle"
              autoCapitalize="none"
            />
          ) : (
            <InputMask
              label="Telefone"
              mask="([00]) [00000]-[0000]"
              name="input"
              keyboardType="numeric"
              icon="times-circle"
              placeholder="Seu telefone"
              enableButton={() => {}}
            />
          )}
        </Form>
      </S.FormContainer>
      <S.ButtonContainer>
        <Button disable={false} onPress={() => formRef.current?.submitForm()}>
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

export default Register;
