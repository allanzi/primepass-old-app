import React, { useEffect, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Header from '../../../../components/Header';
import * as S from './styles';
import { useAction } from '../../../../hooks/actions';
import { AuthConfigType } from '../../../../hooks/auth';

interface RouteParams {
  found: boolean;
  maskedPhone: string;
  phone: string;
  verified: boolean;
  email?: string;
  hasPassword?: boolean;
  id?: string;
  token?: string;
  next?: string;
  authConfig: AuthConfigType;
}

const ConfirmPhoneNumber: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const {
    maskedPhone, authConfig,
  } = params;
  const { logEvent } = useAction();
  const next = params ? params?.next : 'Home';

  const handleUnknownNumber = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'signin',
      group: 'prss',
      context: 'confirm',
      section: 'wrong-phone-number',
      description: 'SignIn Wrong Phone Number',
      userId: '0',
    });
    navigation.navigate('WrongPhoneNumber', {
      next,
    });
  }, []);

  const handleConfirmNumber = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'signin',
      group: 'prss',
      context: 'confirm',
      section: 'right-phone-number',
      description: 'SignIn Right Phone Number',
      userId: '0',
    });
    navigation.navigate('ValidationCode', {
      ...params,
      next,
      flow: 'signin',
      authConfig,
    });
  }, []);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'signin',
      group: 'scrn',
      context: 'confirm',
      section: 'confirm-phone',
      description: 'SignIn Confirm Phone Number',
      userId: '0',
    });
  }, []);

  return (
    <S.Container>
      <Header />
      <S.Message>
        <S.MessageText>
          Opa, identificamos que seu e-mail está vinculado ao número de telefone
          {' '}
          {maskedPhone}
        </S.MessageText>
        <S.MessageText>Confirma que é seu número?</S.MessageText>
      </S.Message>

      <S.ActionsContainer>
        <S.Button onPress={handleConfirmNumber} disable={false}>
          <S.ButtonText>Sim, esse é meu número</S.ButtonText>
        </S.Button>
        <S.Button disable={false} outline onPress={handleUnknownNumber}>
          <S.ButtonText>Não, desconheço esse número</S.ButtonText>
        </S.Button>
      </S.ActionsContainer>
    </S.Container>
  );
};
export default ConfirmPhoneNumber;
