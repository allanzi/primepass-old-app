import React from 'react';

import * as S from './styles';

const Tutorial: React.FC = () => (
  <S.Container>
    <S.Section>
      <S.Step>
        - Apresente o código (ou códigos) exibido
        acima no balcão de atendimento.
      </S.Step>
    </S.Section>

    <S.Section>
      <S.Step>
        - Caso a sessão esteja lotada, utilize o código
        em outra sessão ou filme.
      </S.Step>
    </S.Section>

    <S.Section>
      <S.Step>
        - Esse e outros ingressos ficam salvos no seu
        <S.HighlightText> histórico</S.HighlightText>
        , acessando através do menu no
        caminho:
        <S.HighlightText>página inicial  &gt;  menu &gt; histórico.</S.HighlightText>
      </S.Step>
    </S.Section>
  </S.Container>
);

export default Tutorial;
