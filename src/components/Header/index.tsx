/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';

import icon from '../../assets/img/IconArrowRight.png';
import * as S from './styles';

interface HeaderProps {
  title?: string;
  translucent?: boolean;
  status?: string;
  handleGoBack?: Function;
  color?: string;
  hideBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  translucent,
  status,
  handleGoBack,
  color,
  hideBackButton,
}) => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  const handleGoBackInside = () => {
    if (handleGoBack) {
      handleGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <S.Container title={title} translucent={translucent} status={status}>
      <S.BackButton onPress={handleGoBackInside}>
        {!hideBackButton && (
          <Image source={icon} width={42} height={42} />
        )}
      </S.BackButton>
      {title && (
        <S.TitleContainer>
          <S.Title color={color || theme.colors.colorText}>{title}</S.Title>
        </S.TitleContainer>
      )}
      <S.InvisibleContainer />
    </S.Container>
  );
};

export default Header;
