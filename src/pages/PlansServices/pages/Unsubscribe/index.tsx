import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../../../components/Header';
import * as S from './styles';
import Params from './types';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';

const Unsubscribe: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;
  const { logEvent } = useAction();
  const { user } = useAuth();

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'app',
      group: 'scrn',
      context: 'unsubscribed',
      section: 'unsubscribed',
      description: 'Unsubscribed',
      userId: user ? user.id : '0',
    });
  }, [user]);

  const handleReasonNavigate = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'unsubscribed',
      section: 'unsubscribed',
      description: 'go to reason',
      userId: user ? user.id : '0',
    });
    navigation.navigate('Reason', {
      parentId: params.parentId,
    });
  };

  const handlePlansServicesNavigate = () => {
    logEvent({
      type: 'log-event',
      flow: 'app',
      group: 'prss',
      context: 'unsubscribed',
      section: 'unsubscribed',
      description: 'back plans services',
      userId: user ? user.id : '0',
    });
    navigation.navigate('PlansServices');
  };

  return (
    <S.Fragment>
      <Header
        title="Cancelar assinatura"
        translucent
        color="white"
        handleGoBack={handlePlansServicesNavigate}
      />
      <S.Background
        source={require('../../../../assets/img/background.jpg')}
      />
      <S.GradientBottom
        start={{ x: 0, y: 0.01 }}
        end={{ x: 0, y: 0.9 }}
        colors={['rgba(0, 0, 0, 0.7)', 'transparent', '#212121']}
      />

      <S.Container>
        <S.Title>Você gostaria de cancelar sua assinatura Primepass? </S.Title>
        <S.Subtitle>
          Você tem certeza que gostaria de cancelar sua assinatura e
          não ter mais acesso aos melhores streamings e ingressos de cinema?
        </S.Subtitle>

        <S.ButtonStyled disable={false} onPress={handlePlansServicesNavigate}>
          Não, eu mudei de ideia
        </S.ButtonStyled>
        <S.ButtonStyled disable={false} outline onPress={handleReasonNavigate}>
          Sim, quero cancelar a assinatura
        </S.ButtonStyled>

      </S.Container>

    </S.Fragment>
  );
};

export default Unsubscribe;
