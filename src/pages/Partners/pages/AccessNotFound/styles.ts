import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Button from '../../../../components/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  padding-top: 45px;
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: space-between;
`;

export const CardContainer = styled.Image`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
  align-self: center;
  margin-bottom: 24px;
  margin-top: 24px;
`;

export const Section = styled.ScrollView``;

export const TextContainer = styled.View`
  align-items: flex-start;
  margin-left: 32px;
  margin-right: 60px;
`;

export const TextBottomContainer = styled.View`
  align-items: flex-start;
  margin: 32px;
`;

export const TextBottom = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 10px;
  line-height: 20px;
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

export const LoadContainer = styled.View``;

export const ButtonContainer = styled.View`
  margin: 60px 32px 0;
`;

export const BeginNowButton = styled(Button)``;
