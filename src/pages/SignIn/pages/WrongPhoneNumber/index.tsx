import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../../../components/Header';

import OpenExternalLink from '../../../../utils/openExternalLink';

import * as S from './styles';

import { useAction } from '../../../../hooks/actions';

interface RouteParams {
  flow?: string;
  next?: string;
}
const WrongPhoneNumber: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const { logEvent } = useAction();
  const next = params ? params?.next : 'Home';
  const flow = params ? params?.flow : 'signin';

  const handleHelp = () => {
    logEvent({
      type: 'log-event',
      flow,
      group: 'prss',
      context: 'wrong-phone-number',
      section: 'go-to-help',
      description: 'Go to Attendance',
      userId: '0',
    });
    OpenExternalLink(
      'https://primepass.zendesk.com/hc/pt-br/articles/360021194772-Quais-s%C3%A3o-os-canais-de-atendimento-Primepass-',
    );
  };

  const handleHome = () => {
    logEvent({
      type: 'log-event',
      flow,
      group: 'prss',
      context: 'wrong-phone-number',
      section: 'go-to-home',
      description: 'Go to Home',
      userId: '0',
    });
    navigation.navigate(next, { next });
  };

  useEffect(() => {
    logEvent({
      type: 'log-screen',
      flow,
      group: 'scrn',
      context: 'wrong-phone-number',
      section: 'options',
      description: 'Wrong Phone Number',
      userId: '0',
    });
  }, []);

  return (
    <S.Fragment>
      <Header />
      <S.Container>
        <S.CardContainer
          source={{
            uri: 'https://primepass-imagens.s3.amazonaws.com/4_atualizar-erro.png',
          }}
        />
        <S.MessageTitle>Desculpe o inconveniente.</S.MessageTitle>
        <S.Message>
          Parece que você precisa de ajuda. Entre em contato com o nosso
          {' '}
          <S.TextBold>Atendimento ao Cliente </S.TextBold>
          clicando no botão abaixo para te auxiliarmos o quanto antes. Nossa
          equipe estará pronta para te ajudar
        </S.Message>
        <S.Separator />

        <S.ActionContainer>
          <S.CustonButton disable={false} onPress={handleHelp}>
            Seguir para atendimento
          </S.CustonButton>
          <S.CustonButton disable={false} outline onPress={handleHome}>
            Voltar ao início
          </S.CustonButton>
        </S.ActionContainer>
      </S.Container>
    </S.Fragment>
  );
};

export default WrongPhoneNumber;
