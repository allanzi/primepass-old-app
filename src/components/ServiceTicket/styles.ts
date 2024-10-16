import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

export const Wrapper = styled.SafeAreaView`
  height: 190px;
  width: ${width - 64}px;
  border-radius: 8px;
`;

export const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  resize-mode: cover;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(21, 21, 21, 0.5);
  padding: 10px 16px;
  border-radius: 8px;
  justify-content: space-between;
`;

export const Image = styled(FastImage)`
  max-width: 100%;
  max-height: 100px;
  height: 40px;
  width: 100px;
  resize-mode: contain;
  align-self: center;
`;

export const FooterTicket = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: -8px;
`;

export const FullDate = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  padding: 2px 0;
`;
