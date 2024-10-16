import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const Fragment = styled.ScrollView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CardContainer = styled(FastImage)`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
`;

export const Message = styled.Text`
  margin-top: 15px;
  width: 85%;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const LoadContainer = styled.View``;

export const InputContainer = styled.View`
  margin: 20px 20px 0 20px;
  width: 90%;
  flex-direction: column;
`;

export const ActionContainer = styled.View`
  align-items: center;
  width: 90%;
  flex-direction: row;
  margin: 10px 20px 0 20px;
`;
