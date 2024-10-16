import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import * as S from './styles';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';

const SuccessfullyUnsubscribed: React.FC = () => {
  const navigation = useNavigation();

  const { logEvent } = useAction();
  const { user } = useAuth();

  const handleNavigate = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'successfully-unsubscribed',
      section: 'successfully-unsubscribed',
      description: 'back plans services',
      userId: user ? user.id : '0',
    });

    navigation.navigate('PlansServices');
    return true;
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'successfully-unsubscribed',
      section: 'successfully-unsubscribed',
      description: 'Successfully unsubscribed',
      userId: user ? user.id : '0',
    });
  }, [user]);

  return (
    <AndroidBackHandler onBackPress={handleNavigate}>
      <S.Fragment>
        <S.Container>
          <S.Image
            source={require('../../../../assets/img/unsubscribe.png')}
          />
          <S.Title>Eu estarei bem aqui</S.Title>
          <S.Subtitle>
            Sua assinatura foi cancelada com sucesso.
            Quando quiser é só assinar um plano a sua
            escolha e voltar a se divertir. Estaremos por aqui.
          </S.Subtitle>

          <S.ButtonStyled
            disable={false}
            onPress={handleNavigate}
          >
            Voltar aos planos e serviços

          </S.ButtonStyled>

        </S.Container>
      </S.Fragment>
    </AndroidBackHandler>
  );
};

export default SuccessfullyUnsubscribed;
