import React, { useCallback, useEffect } from 'react';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import * as S from './styles';

const SuccessfullyRedeemed: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { logEvent, logConvertArrayToString } = useAction();
  const route = useRoute();

  const params = route?.params;

  const navigateToHome = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'voucher-redeem',
      section:
        params && 'isComboSelect' in params
          ? 'voucher-go-history'
          : 'voucher-goback-home',
      description: 'Voucher successfully rescued',
      payloadData: {
        title:
          params && 'isComboSelect' in params
            ? 'Voucher go to plans ans services'
            : 'Voucher go back Home',
        voucher: params?.code,
        service: logConvertArrayToString(params?.servicesName),
      },
      userId: user ? user.id : '0',
    });

    if (params && 'isComboSelect' in params) {
      navigation.dispatch(
        CommonActions.navigate('Promotions', {
          screen: 'RedeemCode',
        }),
      );
      navigation.navigate('PlansServices');
      return;
    }

    navigation.dispatch(
      CommonActions.navigate('Promotions', {
        screen: 'RedeemCode',
      }),
    );
    navigation.navigate('Home');
  }, []);

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  const getParamVoucher = () => {
    if (params?.code) {
      return params?.code;
    }
    if (params.data.code) {
      return params.data.code;
    }
    return null;
  };

  const getParamVoucherServices = () => {
    if (params?.servicesName) {
      return logConvertArrayToString(params?.servicesName);
    }
    if (params?.data?.voucher?.services) {
      const services = params?.data?.voucher?.services.map((service: any) => service.name);
      return logConvertArrayToString(services);
    }
    return [];
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'voucher-redeem',
      section: 'voucher-successfully-rescued',
      description: 'Voucher successfully rescued',
      payloadData: {
        title: 'Voucher successfully rescued',
        voucher: getParamVoucher(),
        service: getParamVoucherServices(),
      },
      userId: user ? user.id : '0',
    });
  }, [params]);

  return (
    <AndroidBackHandler
      onBackPress={() => {
        handleGoBack();
        return true;
      }}
    >
      <S.Fragment>
        <Header title="Resgate de voucher" handleGoBack={handleGoBack} />
        {user && (
          <S.Container>
            <S.CardContainer
              source={{
                uri:
                  'https://primepass-imagens.s3.amazonaws.com/16_sucesso-resgate-pickone.png',
              }}
            />
            <S.Message>Código resgatado com sucesso</S.Message>
            <S.SubMessage>
              {params && 'isComboSelect' in params
                ? 'Agora acesse seu histórico de resgate para ativar os serviços digitais disponíveis.'
                : 'Acabamos de te enviar um e-mail com todas as informações'}
            </S.SubMessage>

            <S.ActionContainer>
              <Button disable={false} onPress={navigateToHome}>
                {params && 'isComboSelect' in params
                  ? 'Ir para planos e serviços'
                  : 'Voltar para a página inicial'}
              </Button>
            </S.ActionContainer>
          </S.Container>
        )}
      </S.Fragment>
    </AndroidBackHandler>
  );
};

export default SuccessfullyRedeemed;
