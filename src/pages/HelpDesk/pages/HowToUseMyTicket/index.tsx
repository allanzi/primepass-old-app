import React from 'react';
import FastImage from 'react-native-fast-image';

import Header from '../../../../components/Header';
import * as S from './styles';
import MenuIcon from '../../../../assets/img/menuH.png';

const HowToUseMyTicket: React.FC = () => (
  <S.Fragment>
    <Header title="Como utilizar meu ingresso" />
    <S.PageContainer>
      <S.Container>
        <S.CardContainer
          source={{
            uri:
                'https://primepass-imagens.s3.amazonaws.com/6_como-utilizar.png',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <S.Orientacao>
          <S.Title>Siga as orientações abaixo</S.Title>
          <S.Item>
            - Apresente o código (ou códigos), exibidos após o check-in da
            sessão escolhida, no balcão de atendimento do cinema.
          </S.Item>
          <S.Item>
            - Caso a sessão esteja lotada, utilize o código em outra sessão ou
            filme.
          </S.Item>
          <S.Item>
            - Seus ingressos ficam salvos no seu histórico, acessado através
            do menu
            {' '}
            <S.Icon source={MenuIcon} />
            {' '}
            no caminho:
          </S.Item>
        </S.Orientacao>
      </S.Container>

      <S.RulesContainer>
        <S.Rules>Regras sobre os ingressos</S.Rules>
        <S.RulesText>
          É vedada a comercialização ou exploração econômica do ingresso sobre
          qualquer forma ou meio. O repasse e a venda deste ingresso
          {'\n'}
          esta sujeito a
          {' '}
          <S.RulesTextRed>suspensão de plano</S.RulesTextRed>
          de forma imediata.
        </S.RulesText>
      </S.RulesContainer>
    </S.PageContainer>
  </S.Fragment>
);

export default HowToUseMyTicket;
