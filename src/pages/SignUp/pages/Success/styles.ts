import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  padding-top: 75px;
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: space-between;
`;

export const CardContainer = styled.Image`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
  align-self: center;
  margin-bottom: 16px;
`;

export const Section = styled.View``;

export const TextContainer = styled.View`
  align-items: flex-start;
  padding: 0 32px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  line-height: 28px;
`;

export const ButtonContainer = styled.View`
  padding: 0 32px 50px 32px;
`;

export const LoadContainer = styled.View``;
