import React from 'react';
import { Image } from 'react-native';

import footer from '../../assets/img/footer.png';
import * as S from './styles';

const Footer: React.FC<{ label?: string }> = ({ label }) => (
  <S.Footer>
    <S.Icon>
      <Image source={footer} />
    </S.Icon>
    <S.Label>{label}</S.Label>
  </S.Footer>
);

Footer.defaultProps = {
  label: '',
};

export default Footer;
