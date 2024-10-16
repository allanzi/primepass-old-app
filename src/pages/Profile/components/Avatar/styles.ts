import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions, Platform } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

interface AvatarProps {
  background?: string;
}

export const Container = styled.View<AvatarProps>`
  position: relative;
  top: -100px;
  width: 100%;
  height: ${(HEIGHT * 250) / 640}px;
  background: ${({ background, theme }) => (background || theme.colors.background)};
`;

export const HeaderContainer = styled.View`
  position: absolute;
`;

export const AvatarContainer = styled.View`
  position: absolute;
  width: ${(WIDTH * 140) / 360}px;
  height: ${(HEIGHT * 140) / 640}px;
  align-items: center;
  justify-content: center;
  border-radius: 70px;
  bottom: ${Platform.OS === 'ios' ? 5 : -2}px;
  align-self: center;
`;

export const Cover = styled(FastImage)`
  width: 100%;
  height: ${(HEIGHT * 200) / 640}px;
`;

export const Avatar = styled(FastImage)`
  width: 140px;
  height: 140px;
  border-radius: 140px;
`;

export const LetterContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const Letter = styled.Text`
  font-size: 100px;
  font-weight: 700;
  color: #fff;
`;
