import React from 'react';

import * as S from './styles';

const TicketRules: React.FC = () => (
  <S.Container>
    <S.Title>Regras sobre os ingressos</S.Title>
    <S.Description>
      É vedada a comercialização ou exploração econômica do ingresso
      sobre qualquer forma ou meio. O repasse e a venda deste ingresso
      está sujeita a
      {' '}
      <S.HighlightText>suspensão do plano</S.HighlightText>
      {' '}
      de forma imediata.
    </S.Description>
  </S.Container>
);

export default TicketRules;
