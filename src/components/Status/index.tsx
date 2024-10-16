/* eslint-disable react/require-default-props */
import React from 'react';

import * as S from './styles';

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  if (!status) {
    return <></>;
  }
  return (
    <S.Container>
      <S.Signal type={status} />
      <S.Label>
        {status}
      </S.Label>
    </S.Container>
  );
};

export default Status;
