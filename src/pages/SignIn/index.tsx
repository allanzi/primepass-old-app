/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */
import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { Keyboard, Platform } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import type { TextInputProps } from 'react-native';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthConfigType, useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import Dialog from '../../components/Dialog';
import { isNumeric } from '../../utils/stringTransform';
import { useValidate } from '../../hooks/validate';
import * as S from './styles';

interface FormData {
  input: string;
}

interface Details {
  ttl: number;
}
interface ErrorFormat {
  code: string;
  details: Details;
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
type Type = 'phone' | 'email';
interface RouteParams {
  next?: string;
  flow?: string;
}

const SignIn: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const validate = useValidate();
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const params = route.params as RouteParams;
  const [isFaceLoading, setFaceLoading] = useState(false);
  const [isAppleLoading, setAppleLoading] = useState(false);
  const { verify, verifyLogin, socialLogin } = useAuth();
  const { logEvent } = useAction();
  const [dialogErrors, setDialogErrors] = useState({ title: '', message: '' });
  const [dialogVisible, setDialogVisible] = useState(false);
  const partner_type = 'primepass';
  const [isEmail, setIsEmail] = useState(false);
  const [keyboardType, setKeyboardType] = useState<TextInputProps['keyboardType']>('default');
  const flow = params?.flow ? params?.flow : 'signin';
  const next = params?.next ? params?.next : 'Home';

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'signin',
      group: 'scrn',
      context: 'signin',
      section: 'begin',
      description: 'SignIn',
      userId: '0',
    });
  }, [logEvent]);

  const enableButton = () => {
    setButtonVisible(false);
  };

  const isAValidEmail = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        input: Yup.string()
          .email('E-mail ou número de celular inválido')
          .required('Campo obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      return true;
    } catch (error) {
      const err = getValidationErrors(error);

      formRef.current?.setErrors(err);

      return false;
    }
  }, []);

  const isAValidPhone = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        input: Yup.string()
          .min(11, 'E-mail ou número de celular inválido')
          .max(12, 'E-mail ou número de celular inválido')
          .required('Campo obrigatório'),
      });

      if (!(await schema.validate(data, { abortEarly: false }))) {
        return false;
      }

      return true;
    } catch (error) {
      const err = getValidationErrors(error);

      formRef.current?.setErrors(err);

      return false;
    }
  }, []);

  const usersVerify = useCallback(async (authConfig: AuthConfigType) => {
    const { type, phone, email } = authConfig;

    try {
      const data = await verify(partner_type, {
        type,
        phone,
        email,
      });
      return data;
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
        // const [textMessage, msg] = message.split('0:');
        // const [minutes,] = msg.split(':');

        // console.log('splitter', minutes);
        formRef.current?.setErrors({
          input: message,
        });
      }
    }
    return {};
  }, []);

  const redirectUser = async (pinCodeType: Type, data: FormData) => {
    const type = pinCodeType === 'phone' ? 'sms' : 'email';
    let email = '';

    if (pinCodeType === 'email') {
      email = data.input;
      const response = await verifyLogin(pinCodeType, email.toLowerCase());
      if (!response.found) {
        formRef.current?.setErrors({
          input: 'Este e-mail não foi encontrado',
        });
        setLoading(false);
        return;
      }
      const formattedPhone = response?.phone || '';

      const userResponse = await usersVerify({
        sendType: false,
        phone: formattedPhone,
        email: email.toLowerCase(),
      });

      if (await isAValidEmail(data)) {
        if (response?.verified !== false && response) {
          if (userResponse?.id) {
            navigation.navigate('ValidationCode', {
              ...response,
              ...userResponse,
              next,
              authConfig: {
                type: userResponse.type,
                phone: formattedPhone,
                email: userResponse.email,
              },
            });
          }
          setLoading(false);
          return;
        }
        navigation.navigate('LogInEmail', { email: data.input, next, flow });
      }
      setLoading(false);
    } else {
      if (await isAValidPhone(data)) {
        const formattedPhone = `+55${data.input}` || '';
        const response = await usersVerify({
          sendType: false,
          phone: formattedPhone,
          email,
        });

        if (response) {
          navigation.navigate('ValidationCode', {
            ...response,
            next,
            flow,
            authConfig: {
              type: response.type,
              email: response.email,
              phone: formattedPhone,
            },
          });

          setLoading(false);
        }
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setLoading(true);

    Keyboard.dismiss();
    const { input } = data;

    if (validate.isPhone(input)) {
      redirectUser('phone', data);
      return;
    }

    if (validate.isEmail(input)) {
      redirectUser('email', data);
      return;
    }

    formRef.current?.setErrors({
      input: 'Por favor, digite um email ou telefone válido',
    });
    setLoading(false);
  };

  const getInfoFromToken = async (
    token: string,
    callback: { (user: any): void; (arg0: any): void },
  ) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,email,picture',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error: string, user: any) => {
        if (!error) {
          callback(user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (appleAuthRequestResponse.realUserStatus === 1) {
          await socialLogin({
            partner_type: 'apple',
            partner_id: appleAuthRequestResponse.user,
            partner_token: appleAuthRequestResponse.identityToken || '',
          });

          navigation.dispatch(CommonActions.navigate('Home'));
          navigation.navigate(next, { flow, next });
          return;
        }
        const socialSignUp = {
          name: `${appleAuthRequestResponse.fullName?.givenName} ${appleAuthRequestResponse.fullName?.familyName}`,
          email: appleAuthRequestResponse.email,
          partner_type: 'apple',
          partner_id: appleAuthRequestResponse.user,
          partner_token: appleAuthRequestResponse.identityToken,
        };
        navigation.navigate('SignUp', {
          next,
          flow,
          socialSignUp,
        });
      }
    } catch (error) {
      setDialogVisible(true);
      setDialogErrors({
        title: 'Ops, algo deu errado',
        message:
          'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
      });
    } finally {
      setAppleLoading(false);
    }
  };

  const handlePartnerLogin = async () => {
    navigation.navigate('Partners', {
      flow: 'signin',
    });
  };

  const handleChangeInput = useCallback(async (event) => {
    const { text } = event.nativeEvent;

    if (text.length > 0) {
      setIsEmail(!isNumeric(text));

      setKeyboardType(/^[0-9]{3}/.test(text) ? 'phone-pad' : 'email-address');
      return;
    }
    setKeyboardType('default');
    formRef.current?.setErrors({});
    setIsEmail(false);
  }, []);

  return (
    <S.Container>
      <Header title="Entrar" />
      <Dialog
        title={dialogErrors.title}
        message={dialogErrors.message}
        visible={dialogVisible}
        error
        handleClose={() => setDialogVisible(false)}
      />
      <S.TextPhoneInput>
        Poderia nos informar seu e-mail ou número de telefone?
      </S.TextPhoneInput>
      <S.PhoneInputContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="input"
            icon="times-circle"
            placeholder="E-mail ou número de celular"
            enableButton={enableButton}
            autoCapitalize="none"
            keyboardType="email-address"
            onChange={handleChangeInput}
          />
        </Form>
        <Button
          isLoading={isLoading}
          disable={buttonVisible}
          onPress={() => formRef.current?.submitForm()}
        >
          Continuar
        </Button>
      </S.PhoneInputContainer>

      <S.OrContainer>
        <S.Line />
        <S.OrText>OU</S.OrText>
        <S.Line />
      </S.OrContainer>

      <S.OtherLoginFormContainer>
        {/* <Button
          isLoading={isFaceLoading}
          disable={false}
          onPress={hanleLoginFace}
          style={{
            backgroundColor: '#1877F2',
          }}
        >
          <S.ButtonContent>
            <FaceLogo
              width={24}
              heigth={24}
              style={{ marginTop: -3.5, marginRight: 16 }}
            />
            <S.TextWhite>Entrar com o Facebook</S.TextWhite>
          </S.ButtonContent>
        </Button>

        {Platform.OS === 'ios' && (
          <Button
            isLoading={isAppleLoading}
            disable={false}
            onPress={handleAppleLogin}
            style={{
              backgroundColor: '#000000',
              marginTop: 8,
            }}
          >
            <S.ButtonContent>
              <S.Image source={AppleLogo} />
              <S.TextWhite>Entrar com o Apple ID</S.TextWhite>
            </S.ButtonContent>
          </Button>
        )} */}
        <Button
          isLoading={false}
          disable={false}
          onPress={handlePartnerLogin}
          style={{
            backgroundColor: '#147EB5',
            marginTop: 8,
          }}
        >
          <S.ButtonContent>
            <S.TextWhite>Entrar com parceiros</S.TextWhite>
          </S.ButtonContent>
        </Button>
      </S.OtherLoginFormContainer>
    </S.Container>
  );
};

export default SignIn;
