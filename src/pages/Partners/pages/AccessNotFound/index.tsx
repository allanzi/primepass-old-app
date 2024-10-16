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

const AccessNotFound: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params as RouteParams;
  const next = params?.next ? params?.next : 'Home';
  const { logEvent } = useAction();

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow: 'update',
      group: 'scrn',
      context: 'partners',
      section: 'page',
      description: 'Access not found',
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
              'https://primepass-imagens.s3.amazonaws.com/7_historico-vazio.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <S.TextContainer>
          <S.Title>Não encontramos seu acesso</S.Title>
          <S.Text>
            Você ainda não possui um pacote ativo. Acesse
            www.vivo.com.br/primepass para conhecer os benefícios e vantagens
            exclusivos que só cliente Vivo tem.
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

export default AccessNotFound;
