import React from 'react';

import icon from '../../../../../assets/img/IconArrowRight.png';
import { Props } from './types.d';
import * as S from './styles';

const Header: React.FC<Props> = (props) => {
  const { title, handleGoBack } = props;

  return (
    <S.Container>
      <S.LeftSide>
        <S.ButtonBack onPress={handleGoBack}>
          <S.IconGoBack source={icon} />
        </S.ButtonBack>
      </S.LeftSide>
      <S.CenterSide>
        <S.Title>{title}</S.Title>
      </S.CenterSide>
    </S.Container>
  );
};

export default Header;
