import React from 'react';

import * as S from './styles';

export interface ServiceProps {
  logo: string;
}

const Service: React.FC<ServiceProps> = ({
  logo,
}) => (
  <S.ServiceContainer>
    {logo
      ? (
        <S.Service
          source={{ uri: logo }}
        />
      )
      : (
        <S.ServiceDefault
          source={{ uri: 'https://primepass-sandbox.s3.amazonaws.com/primepass-icon-white.png' }}
        />
      )}

  </S.ServiceContainer>
);

export default Service;
