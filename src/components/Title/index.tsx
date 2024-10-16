/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import * as S from './styles';

const Title: React.FC = ({ children, ...rest }) => (
  <S.Container {...rest}>
    <S.Title>{children}</S.Title>
  </S.Container>
);

export default Title;
