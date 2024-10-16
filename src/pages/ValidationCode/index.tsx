/* eslint-disable no-console */
/* eslint-disable max-len, consistent-return, @typescript-eslint/no-shadow, no-plusplus, @typescript-eslint/naming-convention */
import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, Platform, ActivityIndicator } from 'react-native';
import {
  useRoute,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';

import AsyncStorage from '@react-native-community/async-storage';
import OpenExternalLink from '../../utils/openExternalLink';
import { phoneFormat } from '../../utils/phoneFormat';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { AuthConfigType, useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import PinCode from './components/PinCode';
import { formatTTL } from '../../utils/formatTTL';
import SMSIcon from '../../assets/img/smartphone-white.png';
import EmailIcon from '../../assets/img/mail-white.png';
import HelpIcon from '../../assets/img/question-white.png';
import ArrowRight from '../../assets/img/arrow-right-white.png';
import DisabledSMSIcon from '../../assets/img/smartphone-gray.png';
import DisabledEmailIcon from '../../assets/img/mail-gray.png';
import DisabledArrowRight from '../../assets/img/arrow-right-gray.png';
import * as S from './styles';

interface RouteParams {
  hasPassword: boolean;
  token: string;
  update?: boolean;
  next?: string;
  flow?: string;
  socialSignUp: any;
  partnerSignUp: any;
  period?: number;
  authConfig: AuthConfigType;
}

const ValidationCode: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { update, period } = params;
  const {
    phone, email, name,
  } = params.authConfig;
  const next = params ? params?.next : 'TabNavigation';
  const flow = params ? params?.flow : 'signup';
  const {
    validatePinCode,
    signIn,
    updateAccess,
    user,
    verify,
    registerUser,
    partnerSignIn,
    socialLogin,
    socialSignUp,
  } = useAuth();
  const [loading, setLoading] = useState(false);
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
  const [pinCode, setPinCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(60);
  const [codeLength, setCodeLength] = useState(params?.partnerSignUp ? 4 : 6);
  const [authConfig, setAuthConfig] = useState({} as AuthConfigType);
  const standardTtl = 60;
  const ttl = period || standardTtl;
  let timer = 0;
  let currentTime = ttl;

  const { logEvent, logUserRegister } = useAction();

  const decrementTimeRemaining = () => {
    if (currentTime > 0) {
      currentTime--;
      setTimeRemainingInSeconds(currentTime);
    } else {
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }
      BackgroundTimer.clearInterval(timer);
      timer = 0;
    }
  };

  const stopBackgroundTask = () => {
    if (timer !== 0) {
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }
      BackgroundTimer.clearInterval(timer);
      timer = 0;
    }
  };

  const updateUser = useCallback(async (code: string) => {
    try {
      if (user) {
        setHasError(false);
        setLoading(false);
        await updateAccess({ user_id: user.id, phone, code });

        const hasCompleted = await AsyncStorage.getItem('onboard-completed');

        if (!hasCompleted || hasCompleted !== 'true') {
          navigation.dispatch(CommonActions.navigate('TabNavigation'));
          navigation.navigate('Success', { next: 'Onboard' });
          return;
        }
        navigation.dispatch(CommonActions.navigate('TabNavigation'));
        navigation.navigate('Success', { next });
        return true;
      }
    } catch (error) {
      setLoading(false);
      setHasError(true);
      return false;
    }
  }, []);

  const validate = async (code: string, phone: string) => {
    try {
      setLoading(true);
      setHasError(false);
      const hasCompleted = await AsyncStorage.getItem('onboard-completed');

      const response = await validatePinCode({ partner_type, code, phone });

      if (response?.status) {
        stopBackgroundTask();

        if (params?.socialSignUp) {
          if (params?.socialSignUp.user_id) {
            await socialLogin({
              // eslint-disable-next-line no-restricted-globals
              ...params.socialSignUp,
            });
          } else {
            await socialSignUp({
              name,
              email,
              phone,
              partner_type: params.socialSignUp.partner_type,
              partner_id: params.socialSignUp.partner_id,
              partner_token: params.socialSignUp.partner_token,
            });
          }

          setLoading(false);

          if (!hasCompleted || hasCompleted !== 'true') {
            navigation.dispatch(CommonActions.navigate('TabNavigation'));
            navigation.navigate('Onboard', { next });
            return;
          }
          navigation.dispatch(CommonActions.navigate('TabNavigation'));
          navigation.navigate(next, { next });
          return;
        }

        if (flow !== 'signup' && email && !update) {
          await signIn({ phone, code });

          logEvent({
            type: 'log-screen',
            flow: 'signin',
            group: 'scrn',
            context: 'validation-code',
            section: 'signin',
            description: 'Signin success',
            userId: '0',
          });

          setLoading(false);

          if (!hasCompleted || hasCompleted !== 'true') {
            navigation.dispatch(CommonActions.navigate('TabNavigation'));
            navigation.navigate('Onboard', { next });
            return;
          }

          navigation.dispatch(CommonActions.navigate('TabNavigation'));
          navigation.navigate(next, { next });
          return;
        }

        if (params?.partnerSignUp) {
          if (!response.firstAccess) {
            await partnerSignIn({
              phone,
              partner_type,
              partner_token: code,
            });
            logEvent({
              type: 'log-screen',
              flow: 'signin',
              group: 'scrn',
              context: 'valcode',
              section: 'signin',
              description: 'Partner Validation Code to Home',
              userId: '0',
            });
            setLoading(false);
            stopBackgroundTask();

            if (!hasCompleted || hasCompleted !== 'true') {
              navigation.dispatch(CommonActions.navigate('TabNavigation'));
              navigation.navigate('Onboard', { next });
              return;
            }

            navigation.dispatch(CommonActions.navigate('TabNavigation'));
            navigation.navigate(next, { next });
            return;
          }
          setLoading(false);
          stopBackgroundTask();
          navigation.navigate('Register', {
            inputType: authConfig?.type === 'sms' ? 'phone' : 'email',
            token: code,
            authConfig,
            next,
            flow,
            socialSignUp: params?.socialSignUp,
            partnerSignUp: params?.partnerSignUp,
          });
          return;
        }

        if (update) {
          logEvent({
            type: 'log-screen',
            flow: 'update',
            group: 'scrn',
            context: 'validation-code',
            section: 'update-user',
            description: 'Update user',
            userId: '0',
          });
          await updateUser(code);
          return;
        }

        logEvent({
          type: 'log-screen',
          flow: 'signup',
          group: 'scrn',
          context: 'validation-code',
          section: 'signup',
          description: 'Register user',
          userId: '0',
        });

        const registerResponse = await registerUser({
          name,
          email,
          phone,
          token: code,
        });
        const { id } = registerResponse.user;
        logUserRegister({ id, name, email });
        setLoading(false);
        stopBackgroundTask();
        navigation.navigate('Success', {
          next: 'Onboard',
          flow,
        });
      }
    } catch (error) {
      setLoading(false);
      setHasError(true);
      if (error?.response?.data?.data?.status === false) {
        setErrorMessage('Token inválido');
        return;
      }
      if (error.message === 'Você não possui nenhum plano ativo pela Vivo.') {
        navigation.navigate('AccessNotFound');
        return;
      }
      setErrorMessage(error.message);
    }
  };

  const usersVerify = useCallback(async (verifyConfigType: AuthConfigType) => {
    try {
      const data = await verify(partner_type, verifyConfigType);
      return data;
    } catch (error) {
      if (error && error.response) {
        setHasError(true);
      }
    }
    return false;
  }, []);

  const resendSMS = useCallback(async (resendConfigType: AuthConfigType) => {
    const response = await usersVerify({ ...resendConfigType, sendType: true });

    if (__DEV__) {
      console.log('Resend: ', resendConfigType.type, response.token);
    }

    setAuthConfig(resendConfigType);

    const ttlPeriod = response?.period || standardTtl;

    currentTime = ttlPeriod;

    setTimeRemainingInSeconds(currentTime);

    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }
    timer = BackgroundTimer.setInterval(() => {
      decrementTimeRemaining();
    }, 1000);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }
    timer = BackgroundTimer.setInterval(() => {
      decrementTimeRemaining();
    }, 1000);
    if (__DEV__) {
      console.log('token useEffect: ', params.token);
    }
  }, []);

  useEffect(() => {
    setCodeLength(params?.partnerSignUp ? 4 : 6);
    setAuthConfig(
      params?.authConfig ? params?.authConfig : { type: 'sms', phone: '' },
    );
  }, [params]);

  useEffect(() => {
    if (pinCode.length === codeLength) {
      Keyboard.dismiss();
    }
  }, [pinCode, codeLength]);

  useEffect(() => {
    if (hasError) {
      if (pinCode.length < codeLength) {
        setHasError(false);
      }
    }
  }, [pinCode, codeLength, hasError]);

  const handleSendPinCode = (type: string) => {
    if (timeRemainingInSeconds > 0) {
      return;
    }

    resendSMS({
      type,
      phone,
      email: email || '',
    });
  };

  const handleHelp = () => {
    OpenExternalLink(
      'https://primepass.zendesk.com/hc/pt-br/articles/360021194772-Quais-s%C3%A3o-os-canais-de-atendimento-Primepass',
    );
  };

  return (
    <S.Container>
      <S.Section>
        <S.HeadContainer>
          <Header title="Boas-vindas à Primepass" />
        </S.HeadContainer>
        {authConfig.type === 'sms' ? (
          <>
            <S.Title>
              Digite o código de autenticação de
              {' '}
              {codeLength}
              {' '}
              dígitos que
              enviamos para
            </S.Title>
            <S.TextPhone>{phoneFormat(phone)}</S.TextPhone>
          </>
        ) : (
          <>
            <S.Title>
              Acabamos de enviar o código de autenticação para o seu e-mail
            </S.Title>
            <S.TextPhone>{email}</S.TextPhone>
          </>
        )}
        <PinCode
          hasError={hasError}
          codeLength={codeLength}
          value={pinCode}
          error={errorMessage}
          onTextChange={(code: string) => setPinCode(code)}
          align={codeLength > 4 ? 'flex-end' : 'flex-start'}
        />
      </S.Section>
      <S.Footer>
        {timeRemainingInSeconds > 0 ? (
          <S.Timer>
            Por favor, tente entrar novamente em
            {' '}
            {formatTTL(timeRemainingInSeconds)}
            {' '}
            segundos
          </S.Timer>
        ) : (
          <S.Label hasError={false}>Não Recebi meu código</S.Label>
        )}
        <S.NotReceivedContainer>
          <S.MenuContainer>
            <S.Separator>
              <S.LineSeparator />
            </S.Separator>
            <S.MenuItem
              disabled={timeRemainingInSeconds > 0}
              onPress={() => handleSendPinCode('sms')}
            >
              <S.ContentInfo>
                <S.MenuIcon
                  source={
                    timeRemainingInSeconds > 0 ? DisabledSMSIcon : SMSIcon
                  }
                />
                <S.MenuInfo>
                  <S.MenuLabel disabled={timeRemainingInSeconds > 0}>
                    Reenviar por SMS
                  </S.MenuLabel>
                </S.MenuInfo>
              </S.ContentInfo>
              <S.Icon
                source={
                  timeRemainingInSeconds > 0 ? DisabledArrowRight : ArrowRight
                }
              />
            </S.MenuItem>
            {partner_type !== 'vivo' && (
              <S.MenuItem
                disabled={timeRemainingInSeconds > 0}
                onPress={() => handleSendPinCode('email')}
              >
                <S.ContentInfo>
                  <S.MenuIcon
                    source={
                      timeRemainingInSeconds > 0 ? DisabledEmailIcon : EmailIcon
                    }
                  />
                  <S.MenuInfo>
                    <S.MenuLabel disabled={timeRemainingInSeconds > 0}>
                      Reenviar por E-mail
                    </S.MenuLabel>
                  </S.MenuInfo>
                </S.ContentInfo>
                <S.Icon
                  source={
                    timeRemainingInSeconds > 0 ? DisabledArrowRight : ArrowRight
                  }
                />
              </S.MenuItem>
            )}
            <S.MenuItem disabled={false} onPress={() => handleHelp()}>
              <S.ContentInfo>
                <S.MenuIcon source={HelpIcon} />
                <S.MenuInfo>
                  <S.MenuLabel disabled={false}>Preciso de ajuda</S.MenuLabel>
                </S.MenuInfo>
              </S.ContentInfo>
              <S.Icon source={ArrowRight} />
            </S.MenuItem>
          </S.MenuContainer>
        </S.NotReceivedContainer>
        <Button
          disable={hasError || pinCode.length !== codeLength}
          onPress={() => validate(pinCode, phone)}
        >
          {loading ? <ActivityIndicator color="#fff" size={20} /> : 'Continuar'}
        </Button>
      </S.Footer>
    </S.Container>
  );
};

export default ValidationCode;
