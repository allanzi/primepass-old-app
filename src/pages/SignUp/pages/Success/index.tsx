import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';

import Button from '../../../../components/Button';
import { useAction } from '../../../../hooks/actions';
import { useAuth } from '../../../../hooks/auth';
import { ucFirst } from '../../../../utils/stringTransform';
import * as S from './styles';

interface RouteParams {
  next?: string;
  flow: string;
}

const Success: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params as RouteParams;
  const next = params ? params?.next : 'Home';
  const flow = params ? params?.flow : 'signup';
  const { logEvent } = useAction();
  const { user } = useAuth();

  const NavigateToHome = () => {
    navigation.dispatch(CommonActions.navigate('Home'));
    navigation.navigate(next, { next });
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow,
      group: 'scrn',
      context: flow,
      section: 'success',
      description: `${ucFirst(flow)} Success`,
      userId: user ? user.id : '0',
    });
  }, []);

  return (
    <S.Container>
      <S.Section>
        <S.CardContainer
          source={{
            uri:
              'https://primepass-imagens.s3.amazonaws.com/5_atualizar-sucesso.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <S.TextContainer>
          <S.Title>Que comece a diversão!</S.Title>
          <S.Text>
            Cinema, filmes, séries, músicas e livros!
            {' '}
            {'\n'}
            Utilize seu cadastro para explorar todos os
            {' '}
            {'\n'}
            nossos conteúdos e escolha o plano que
            {' '}
            {'\n'}
            mais combina com você!
          </S.Text>
        </S.TextContainer>
      </S.Section>
      <S.ButtonContainer>
        <Button onPress={NavigateToHome} disable={false}>
          Continuar
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default Success;
