/* eslint-disable no-plusplus */
import React from 'react';

import * as S from './styles';

interface DottedProps {
  vertical: boolean;
}

const Dotted: React.FC<DottedProps> = ({ vertical = false }) => {
  const dottedRow = (points: number) => {
    const text = [];
    for (let x = 0; x < points; x++) {
      text.push(<S.Dotted key={x} />);
    }
    return text;
  };

  return (
    <>
      {vertical && <S.VerticalSeparator>{dottedRow(13)}</S.VerticalSeparator>}
      {!vertical && (
        <S.HorizontalSeparator>{dottedRow(110)}</S.HorizontalSeparator>
      )}
    </>
  );
};

export default Dotted;
