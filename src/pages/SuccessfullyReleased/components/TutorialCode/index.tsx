import React from 'react';

import * as S from './styles';

interface TutorialCodeProps {
  isCinemark: Boolean;
}

const TutorialCode: React.FC<TutorialCodeProps> = ({ isCinemark }) => (
  <S.Container>
    <S.Title>Como utilizar meu ingresso</S.Title>
    <S.Section>
      <S.Step>- Vá até o site da ingresso.com.</S.Step>
    </S.Section>

    <S.Section>
      <S.Step>- Selecione o filme e a sessão desejada.</S.Step>
    </S.Section>

    <S.Section>
      <S.Step>
        - Na seleção de ingressos, utilize seus códigos em
        {' '}
        <S.Bold>
          {isCinemark ? 'Super Saver Eletrônico' : 'Cinematicket Eletrônico'}
        </S.Bold>
        .
      </S.Step>
    </S.Section>
  </S.Container>
);

export default TutorialCode;
