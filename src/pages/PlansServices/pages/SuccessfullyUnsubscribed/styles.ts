import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Button from '../../../../components/Button';

const { width } = Dimensions.get('window');

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: ${width}px;
`;

export const Container = styled.View`
  padding: 32px;
  margin-top: 20%;
`;

export const Image = styled.Image`
  width: 100%;
  height: 200px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 26px;
  color: #FFFFFF;
  margin-top: 24px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const ButtonStyled = styled(Button)``;
