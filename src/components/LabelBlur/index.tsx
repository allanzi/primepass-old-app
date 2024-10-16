/* eslint-disable react/no-unused-prop-types, react/require-default-props */
import React from 'react';

import * as S from './styles';

import { Maybe } from '../../@types/graphql/schemas';

interface LabelBlurProps {
  title: string | null;
  genre?: Maybe<Maybe<string>[]>;
  autor?: string;
}

const LabelBlur: React.FC<LabelBlurProps> = ({ title, genre }) => (
  <S.Radius>
    <S.Container>
      <S.Title numberOfLines={2} ellipsizeMode="tail">
        {title}
      </S.Title>
      <S.GenreContainer>
        {genre?.map((item, index) => (
          <S.Genre key={item}>
            {item}
            {' '}
            {index >= genre.length - 1 ? '' : '|'}
            {' '}
          </S.Genre>
        ))}
      </S.GenreContainer>
    </S.Container>
  </S.Radius>
);

export default LabelBlur;
