import React, { useCallback, useEffect } from 'react';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../../../components/Button';
import { useAction } from '../../../../hooks/actions';
import * as S from './styles';

interface RouteParams {
  next?: string;
}
const UpdateRequest: React.FC = () => {
  const route = useRoute();
  const params = route?.params as RouteParams;
  const navigation = useNavigation();
  const next = params ? params?.next : 'Home';
  const { logEvent } = useAction();

  const handleNavigateUpdate = useCallback(() => {
    logEvent({
      type: 'log-event',
      flow: 'signin',
      group: 'prss',
      context: 'update-request',
      section: 'update-now',
      description: 'Update now',
      userId: '0',
    });
    navigation.navigate('Update', { next });
  }, []);

  const handleNavigateHome = useCallback(async () => {
    logEvent({
      type: 'log-event',
      flow: 'signin',
      group: 'scrn',
      context: 'update-request',
      section: 'change-later',
      description: 'Change later',
      userId: '0',
    });

    const hasCompleted = await AsyncStorage.getItem('onboard-completed');

    if (!hasCompleted || hasCompleted !== 'true') {
      navigation.dispatch(CommonActions.navigate('Home'));
      navigation.navigate('Onboard', { next });
      return;
    }

    navigation.dispatch(CommonActions.navigate('Home'));
    navigation.navigate(next, { next });
  }, []);

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'signin',
      group: 'scrn',
      context: 'update-request',
      section: 'page',
      description: 'Update Request',
      userId: '0',
    });
  }, []);

  return (
    <S.Container>
      <StatusBar backgroundColor="rgba(0,0,0, 0.8)" />
      <S.Section>
        <S.CardContainer
          source={{
            uri:
              'https://primepass-imagens.s3.amazonaws.com/3_atualizar-cadastro.png',
          }}
        />
        <S.Title>Vamos atualizar seu cadastro?</S.Title>

        <S.DescriptionContainer>
          <S.Description numberOfLines={4}>
            A partir do dia
            <S.Description warn> 20/12</S.Description>
            , seu acesso será efetuado
            apenas por
            {' '}
            <S.Description warn>código enviado via SMS</S.Description>
            para o número de celular cadastrado. Deseja atualizar seus dados
            agora ?
          </S.Description>
        </S.DescriptionContainer>
      </S.Section>
      <S.Footer>
        <Button disable={false} onPress={handleNavigateUpdate}>
          Atualizar agora
        </Button>
        <Button outline disable={false} onPress={handleNavigateHome}>
          Atualizar depois
        </Button>
      </S.Footer>
    </S.Container>
  );
};

export default UpdateRequest;
