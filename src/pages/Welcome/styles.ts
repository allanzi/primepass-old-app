import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
  align-items: center;
`;

export const LogoContainer = styled.View`
  width: 70%;
  margin: 0 auto;
`;

export const Logo = styled.Image`
  width: 100%;
`;

export const ImageBgContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ImageBg = styled.Image`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
`;

export const TextContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 90%;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: justify;
  width: 100%;
  margin-bottom: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Description = styled.Text`
  font-size: 18px;
  text-align: justify;
  width: 100%;
  line-height: 35px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Footer = styled.View`
  height: 120px;
  justify-content: space-between;
  width: 90%;
  bottom: 35px;
`;

export const Header = styled.View`
  top: 45px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-left: 8px;
`;
export const BackButton = styled(BorderlessButton)`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0 10px;
`;
