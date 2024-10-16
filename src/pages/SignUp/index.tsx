/* eslint-disable max-len, @typescript-eslint/no-use-before-define, @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */
import React, {
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { ThemeContext } from 'styled-components';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import type { TextInputProps } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthConfigType, useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import Dialog, { Footer as FooterInterface } from '../../components/Dialog';
import OpenExternalLink from '../../utils/openExternalLink';
import { ucFirst, isNumeric } from '../../utils/stringTransform';
import { useValidate } from '../../hooks/validate';
import * as S from './styles';

interface FormData {
  input: string;
}

interface SocialSignUpParams {
  name?: string;
  email?: string;
  partner_type: string;
  partner_id?: string;
  partner_token?: string;
}

interface PartnerSignUpParams {
  name?: string;
  email?: string;
  partner_type: string;
}
interface RouteParams {
  next?: string;
  flow?: string;
  socialSignUp?: SocialSignUpParams;
  partnerSignUp?: PartnerSignUpParams;
}
export interface ModalMessageProps {
  title: string;
  message?: string | null;
  error?: boolean;
  children?: any;
  footer?: FooterInterface[] | null;
}

const SignUp: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const validate = useValidate();
  const theme = useContext(ThemeContext);
  const formRef = useRef<FormHandles>(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const { verifyLogin, verify } = useAuth();
  const { logEvent } = useAction();
  const params = route.params as RouteParams;
  const flow = params?.flow || 'signup';
  const next = params?.next || 'Home';
  const [isFaceLoading, setFaceLoading] = useState(false);
  const [isAppleLoading, setAppleLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [keyboardType, setKeyboardType] = useState<TextInputProps['keyboardType']>('default');
  const setPartnerType = () => {
    if (params?.socialSignUp) {
      return params.socialSignUp?.partner_type;
    }
    if (params?.partnerSignUp) {
      return params.partnerSignUp?.partner_type;
    }
    return 'primepass';
  };
  const partner_type = setPartnerType();
  const placeholderInput = params?.partnerSignUp
    ? `Número de celular ${ucFirst(partner_type)}`
    : 'E-mail ou número de telefone';

  const [dialogErrors, setDialogErrors] = useState({
    title: '',
    message: '',
    error: true,
    footer: null,
  } as ModalMessageProps);
  const [isEmail, setIsEmail] = useState(false);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow,
      group: 'scrn',
      context: 'signup',
      section: 'begin',
      description: 'SignUp',
      userId: '0',
    });
  }, []);

  useEffect(() => {
    if (params?.partnerSignUp && partner_type === 'vivo') {
      setDialogErrors({
        title: 'Aviso importante para clientes Vivo',
        message:
          'A Vivo, em parceria com a Primepass, oferece '
          + 'pacotes onde seus clientes podem ter acesso a '
          + 'ingressos de cinema todos os meses. '
          + '\n\nPara obter esse benefício, é necessário ativar '
          + 'esse pacote no site da Vivo no endereço: '
          + 'www.vivo.com.br/primepass',
        error: false,
        footer: [
          {
            text: 'Visitar o site da Vivo agora',
            action: () => {
              setDialogVisible(false);
              goToVivoHandle();
            },
            props: {
              style: {
                color: '#72B1D2',
              },
            },
          },
          {
            text: 'Pular',
            action: () => setDialogVisible(false),
          },
        ],
      });
      setDialogVisible(true);
    }
  }, [params]);

  const goToVivoHandle = () => {
    logEvent({
      type: 'log-event',
      flow: 'signup',
      group: 'link',
      context: 'signup',
      section: 'go-to-website',
      description: 'Go to the VIVO website',
      userId: '0',
    });
    OpenExternalLink('https://www.vivo.com.br/primepass');
  };

  const enableButton = () => {
    setButtonVisible(false);
  };

  const validateForm = async (data: FormData): Promise<boolean> => {
    try {
      const { input } = data;
      let schema = null;
      formRef.current?.setErrors({});
      if (isNumeric(input)) {
        schema = Yup.object().shape({
          input: Yup.string()
            .min(10, 'Mínimo 10 caracteres')
            .max(15, 'Máximo 15 caracteres')
            .required('Obrigatório'),
        });
      } else {
        schema = Yup.object().shape({
          input: Yup.string()
            .email('E-mail inválido')
            .required('Campo obrigatório'),
        });
      }

      if (!(await schema.validate(data, { abortEarly: false }))) {
        return false;
      }
      return true;
    } catch (error) {
      const err = getValidationErrors(error);
      formRef.current?.setErrors(err);
      return false;
    }
  };

  async function usersCheckExists(inputType: string, input: string) {
    try {
      const data = await verifyLogin(inputType, input);
      return data;
    } catch (error) {
      formRef.current?.setFieldError('input', error.message);
      throw new Error(error.message);
    }
  }

  async function usersVerify(partnerType: string, verifyAuth: AuthConfigType) {
    try {
      const data = await verify(partnerType, verifyAuth);
      return data?.data;
    } catch (error) {
      formRef.current?.setFieldError('input', error.message);
      throw new Error(error.message);
    }
  }

  const handleSubmit = useCallback(
    async (data) => {
      const { input } = data;
      setLoading(true);

      if (validate.isEmail(input) || validate.isPhone(input)) {
        const inputType = isNumeric(data.input) === true ? 'phone' : 'email';
        const inputFormatted = inputType === 'phone' ? `+55${input}` : input.toLowerCase();

        try {
          let newFlow = params.flow;
          const response = await usersCheckExists(inputType, inputFormatted);
          const verifyAuth = {
            type: inputType === 'phone' ? 'sms' : 'email',
            phone: inputType === 'phone' ? inputFormatted : null,
            email: inputType === 'email' ? input.toLowerCase() : null,
          };

          if (partner_type === 'vivo' && response.found === false) {
            newFlow = 'signup';
          }

          if (newFlow === 'signup') {
            if (response.found && !params?.socialSignUp) {
              formRef.current?.setFieldError(
                'input',
                `Este ${
                  inputType === 'phone' ? 'telefone' : 'email'
                }, já foi utilizado`,
              );
              setLoading(false);
              return;
            }

            setLoading(false);
            if (params?.partnerSignUp && partner_type === 'vivo') {
              usersVerify(partner_type, verifyAuth);
              navigation.navigate('ValidationCode', {
                inputType,
                authConfig: verifyAuth,
                next,
                flow: newFlow,
                socialSignUp: params?.socialSignUp,
                partnerSignUp: params?.partnerSignUp,
              });
              return;
            }

            if (params?.socialSignUp && response.id) {
              usersVerify(partner_type, verifyAuth);
              navigation.navigate('ValidationCode', {
                ...response,
                inputType,
                authConfig: verifyAuth,
                next,
                flow: newFlow,
                socialSignUp: {
                  ...params?.socialSignUp,
                  user_id: response.id,
                },
                partnerSignUp: params?.partnerSignUp,
              });
              return;
            }

            navigation.navigate('Register', {
              inputType,
              authConfig: verifyAuth,
              next,
              flow: newFlow,
              socialSignUp: params?.socialSignUp,
              partnerSignUp: params?.partnerSignUp,
            });
            return;
          }

          const responseVerify = usersVerify(partner_type, verifyAuth);
          navigation.navigate('ValidationCode', {
            inputType,
            authConfig: verifyAuth,
            next,
            flow: newFlow,
            socialSignUp: params?.socialSignUp,
            partnerSignUp: params?.partnerSignUp,
          });
        } catch (error) {
          setDialogVisible(true);
          setDialogErrors({
            title: 'Ops, algo deu errado',
            message:
              'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
            error: true,
          });
        } finally {
          setLoading(false);
        }
        return;
      }

      formRef.current?.setErrors({
        input: 'Por favor, digite um email ou telefone válido',
      });
      setLoading(false);
    },
    [params],
  );

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
          setDialogVisible(true);
          setDialogErrors({
            title: 'Ops, algo deu errado',
            message: 'Parece que você já possui cadastro.',
            error: true,
          });
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
          flow,
          next,
          socialSignUp,
        });
      }
    } catch (error) {
      setDialogVisible(true);
      setDialogErrors({
        title: 'Ops, algo deu errado',
        message:
          'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
        error: true,
      });
    } finally {
      setAppleLoading(false);
    }
  };

  const handlePartnerLogin = async () => {
    navigation.navigate('Partners', {
      flow,
      next,
    });
  };

  const TextContinue = () => {
    if (params?.partnerSignUp) {
      return (
        <S.TextPhoneInput>
          Para continuar, precisamos que nos informe seu número
          <S.TextBoldPhoneInput>
            {' '}
            {ucFirst(params?.partnerSignUp.partner_type)}
          </S.TextBoldPhoneInput>
        </S.TextPhoneInput>
      );
    }

    if (params?.socialSignUp) {
      return (
        <S.TextPhoneInput>
          Para finalizar seu cadastro com
          {' '}
          <S.TextBoldPhoneInput>
            {ucFirst(params?.socialSignUp.partner_type)}
          </S.TextBoldPhoneInput>
          , poderia nos informar seu número de celular?
        </S.TextPhoneInput>
      );
    }

    return (
      <S.TextPhoneInput>
        Para entrar é necessário informar seu e-mail ou número de telefone
      </S.TextPhoneInput>
    );
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
      <Header title="Boas-vindas à Primepass" />
      <Dialog
        title={dialogErrors.title}
        message={dialogErrors.message}
        visible={dialogVisible}
        handleClose={() => setDialogVisible(false)}
        error={dialogErrors.error}
        footer={dialogErrors.footer}
      />

      <TextContinue />

      <S.PhoneInputContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="input"
            icon="times-circle"
            placeholder={placeholderInput}
            enableButton={enableButton}
            autoCapitalize="none"
            keyboardType="email-address"
            onChange={handleChangeInput}
          />

          <Button
            disable={buttonVisible}
            onPress={() => formRef.current?.submitForm()}
          >
            {loading ? (
              <S.LoadContainer>
                <ActivityIndicator
                  size="small"
                  color={theme.colors.colorTextButton}
                />
              </S.LoadContainer>
            ) : (
              'Continuar'
            )}
          </Button>
        </Form>
      </S.PhoneInputContainer>

      {!params?.socialSignUp && !params?.partnerSignUp && (
        <>
          <S.OrContainer>
            <S.Line />
            <S.OrText>OU</S.OrText>
            <S.Line />
          </S.OrContainer>

          <S.OtherLoginFormContainer>
            {/* <Button
              isLoading={isFaceLoading}
              disable={false}
              onPress={handleLoginFace}
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
                <S.TextWhite>Cadastrar com o Facebook</S.TextWhite>
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
                  <S.TextWhite>Cadastrar com o Apple ID</S.TextWhite>
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
                <S.TextWhite>Cadastrar com parceiros</S.TextWhite>
              </S.ButtonContent>
            </Button>
          </S.OtherLoginFormContainer>
        </>
      )}
    </S.Container>
  );
};

export default SignUp;
