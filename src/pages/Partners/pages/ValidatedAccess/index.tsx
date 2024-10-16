import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';

import { useAction } from '../../../../hooks/actions';
import * as S from './styles';

interface RouteParams {
  next?: string;
}

const ValidatedAccess: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params as RouteParams;
  const next = params ? params?.next : 'Home';
  const { logEvent } = useAction();

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'update',
      group: 'scrn',
      context: 'partners',
      section: 'page',
      description: 'Update Success',
      userId: '0',
    });
  }, []);

  const navigateToHome = () => {
    navigation.dispatch(CommonActions.navigate('Home'));
    navigation.navigate(next, { next });
  };

  return (
    <S.Container>
      <S.Section>
        <S.CardContainer
          source={{
            uri:
              'https://primepass-imagens.s3.amazonaws.com/16_sucesso-resgate-pickone.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <S.TextContainer>
          <S.Title>Acesso validado!</S.Title>
          <S.Text>
            Você já pode curtir o melhor do cinema aonde estiver e tem direito a
            1 ingresso 2D por semana de segunda a quarta-feira e ainda conta com
            benefícios exclusivos que você só tem pela Vivo.
          </S.Text>
        </S.TextContainer>

        <S.ButtonContainer>
          <S.BeginNowButton onPress={navigateToHome} disable={false}>
            Começar agora
          </S.BeginNowButton>
        </S.ButtonContainer>

        <S.TextBottomContainer>
          <S.TextBottom>
            A Vivo e a Primepass oferecem o pacote premium onde o usuário pode
            ter acesso a 4 ingressos 2D todos os meses por apenas R$ 34,99 por
            mês. Basta acessar www.vivo.com.br/primepass e assinar. Conte para
            os seu amigos e venha curtir o melhor do cinema com a gente!
          </S.TextBottom>
        </S.TextBottomContainer>
      </S.Section>
    </S.Container>
  );
};

export default ValidatedAccess;
