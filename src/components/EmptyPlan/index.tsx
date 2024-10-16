import React from 'react';

import EmptyPlanProps from './types';
import * as S from './styles';

const EmptyPlan: React.FC<EmptyPlanProps> = ({
  title,
}) => (
  <S.Container>
    <S.Title>{title}</S.Title>
  </S.Container>
);

export default EmptyPlan;
