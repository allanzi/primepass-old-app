import React from 'react';

import * as S from './styles';

const TutorialCode: React.FC = () => (
  <S.Container>
    <S.Title>
      Como utilizar meu ingresso
    </S.Title>
    <S.Section>
      <S.Step>
        - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Morbi ut condimentum mauris.
      </S.Step>
    </S.Section>

    <S.Section>
      <S.Step>
        - Ut blandit ligula sit amet varius placerat lorem
        ipsum dolor sit amet, consectetur adipiscing
      </S.Step>
    </S.Section>

    <S.Section>
      <S.Step>
        - Nam in commodo sapien. Aenean ac
        dignissim elit. Curabitur justo tellus, laoreet nec
        gravida et, elementum ut ante curabitur
      </S.Step>
    </S.Section>
  </S.Container>
);

export default TutorialCode;
