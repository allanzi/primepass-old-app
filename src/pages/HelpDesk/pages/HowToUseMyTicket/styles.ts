import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const PageContainer = styled.ScrollView`
  margin: 0px 16px 32px 16px;
`;

export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const Orientacao = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 32px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export const Item = styled.Text`
  color: #ccc;
  font-size: 14px;
  line-height: 24px;
  margin-top: 20px;
`;

export const RulesContainer = styled.View`
  width: 90%;
  background-color: #707070;
  justify-content: space-between;
  align-items: flex-start;
  align-self: center;
  padding: 10px;
  border-radius: 8px;
`;

export const Rules = styled.Text`
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const RulesText = styled.Text`
  color: #fff;
  font-size: 10px;
  line-height: 13px;
`;

export const RulesTextRed = styled.Text`
  color: #ff6666;
  font-size: 10px;
  line-height: 13px;
`;

export const CardContainer = styled(FastImage)`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
`;
