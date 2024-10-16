/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';

import * as S from './styles';

interface ParentalRating {
  children: string;
}

const ParentalRating: React.FC<ParentalRating> = ({ children }) => (
  <S.ParentalRating type={children}>
    <S.ParentalRatingText>
      {children}
    </S.ParentalRatingText>
  </S.ParentalRating>
);

export default ParentalRating;
