/* eslint-disable react/require-default-props */
import React from 'react';

import * as S from './styles';

interface BadgeProps {
  name?: string;
  type?: string;
  circled?: boolean;
  style?: any;
}

const Badge: React.FC<BadgeProps> = ({
  name, type, circled = false, ...props
}) => {
  if (!name) {
    return <></>;
  }
  return (
    <>
      { circled ? (
        <S.Badge type={type || name}>
          <S.BadgeContent>{name}</S.BadgeContent>
        </S.Badge>
      ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <S.Label type={type || name} {...props}>
          <S.LabelContent>{name}</S.LabelContent>
        </S.Label>
      )}
    </>
  );
};

export default Badge;
