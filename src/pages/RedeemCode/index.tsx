import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Keyboard } from 'react-native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { SITE } from '@env';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';
import { useThemeContext } from '../../hooks/theme';
import getValidationErrors from '../../utils/getValidationErrors';
import OpenExternalLink from '../../utils/openExternalLink';
import * as S from './styles';

interface ErrorFormat {
  code: string;
  details: string | null;
  message: string;
}

interface ResponseError {
  data: ErrorFormat;
}

interface ServerError {
  response: {
    data: ResponseError;
    status: number;
  };
}

interface Service {
  id: string;
  description: {
    text_button: string;
    link: string;
    label_link: string;
    steps: Array<string>;
  };
  type: {
    name: string;
    title: string;
  };
}

interface Voucher {
  combo: boolean;
  user_choices: {
    needChoice: boolean;
    choiceCount: number;
  };
  services: Array<Service>;
}

interface Response {
  voucher: Voucher;
}

interface FormData {
  code: string;
}

const RedeemCode: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sitePrimepass, setSitePrimepass] = useState(true);
  const { logEvent } = useAction();
  const { theme: themeDefault } = useThemeContext();

  const navigation = useNavigation();

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'voucher-redeem',
      section: 'page',
      description: 'Voucher redeem',
      userId: user ? user.id : '0',
    });
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      formRef.current?.setFieldValue('code', '');
    }, [formRef]),
  );

  const enableButton = () => {
    setButtonVisible(false);
  };

  const infoCode = useCallback(async (voucher) => {
    setSitePrimepass(true);
    try {
      const { data } = await api.get(`/voucher-codes/${voucher}`);

      const response = data as Response;

      if (data?.voucher?.user_choiches?.needChoice === true) {
        navigation.navigate('Promotions', {
          screen: 'RedeemSelectService',
          params: {
            ...data,
            partner_subscription: false,
          },
        });

        return;
      }

      if (response.voucher.services.length > 0) {
        navigation.navigate('Promotions', {
          screen: 'RedeemComboService',
          params: {
            ...data,
          },
        });
      }
    } catch (error) {
      if (error && error.response) {
        const apiError = error as ServerError;
        const {
          response: {
            data: {
              data: { message },
            },
          },
        } = apiError;
        formRef.current?.setErrors({
          code: message,
        });
      }
    }
  }, []);

  const validateCode = useCallback(async (data: FormData) => {
    try {
      const schema = Yup.object().shape({
        code: Yup.string().required('O Código é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
      return false;
    }
  }, []);

  const handleSubmit = useCallback(
    async ({ code }: FormData) => {
      if (!user) {
        navigation.dispatch(CommonActions.navigate('Home'));
        navigation.navigate('Login', {
          screen: 'Welcome',
          params: {
            next: 'RedeemCode',
          },
        });
        setSitePrimepass(true);
        setButtonVisible(false);
        return;
      }

      try {
        setLoading(true);
        const isValid = await validateCode({ code });
        if (isValid) {
          logEvent({
            type: 'log-event',
            flow: 'app',
            group: 'prss',
            context: 'voucher-redeem',
            section: 'confirm-button',
            description: 'Confirm voucher redeemed',
            payloadData: {
              title: 'Confirm voucher redeemed',
              voucher: code,
            },
            userId: user ? user.id : '0',
          });
          await infoCode(code);
          Keyboard.dismiss();
        }
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const handleGoToPrimepass = () => {
    if (sitePrimepass === false) {
      OpenExternalLink(`${SITE}/acesso?_redirect=%2Fresgate-de-voucher`);
    }
  };

  return (
    <S.Fragment>
      <Header
        title="Resgate de voucher"
        handleGoBack={() => navigation.navigate('TabNavigation')}
      />
      <S.Container>
        <S.CardContainer
          source={{
            uri:
              'https://primepass-imagens.s3.amazonaws.com/8_resgate-voucher.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <S.Message>Resgate aqui seu voucher promocional Primepass</S.Message>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.InputContainer>
            <Input
              name="code"
              icon="times-circle"
              placeholder="Escrever o código"
              enableButton={enableButton}
              keyboardAppearance={themeDefault === 'dark' ? 'dark' : 'light'}
              errorCenter
              onSubmitEditing={() => formRef.current?.submitForm()}
              onChange={() => {
                setSitePrimepass(true);
              }}
            />
          </S.InputContainer>

          <S.ActionContainer>
            <Button
              disable={buttonVisible}
              onPress={() => formRef.current?.submitForm()}
              isLoading={loading}
            >
              Resgatar
            </Button>
          </S.ActionContainer>
          {!sitePrimepass && (
            <S.ActionContainer>
              <Button disable={false} onPress={() => handleGoToPrimepass()}>
                Acessar o site
              </Button>
            </S.ActionContainer>
          )}
        </Form>
      </S.Container>
    </S.Fragment>
  );
};

export default RedeemCode;
