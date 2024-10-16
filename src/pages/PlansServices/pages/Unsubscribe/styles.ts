/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import Button from '../../../../components/Button';

const { width } = Dimensions.get('window');

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: ${width}px;
`;

export const Background = styled(FastImage)`
  width: ${width}px;
  height: 310px;
  align-self: center;
  position: absolute;
  top: 0px;
`;

export const GradientBottom = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 330px;
`;

export const Container = styled.View`
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 26px;
  color: #FFFFFF;
  margin-top: 65%;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  margin-top: 16px;
  margin-bottom: 42px;
`;

export const ButtonStyled = styled(Button)`
  margin-top: 8px;
`;
