import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import Button from '../../../../components/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const BTNWIDTH = WIDTH * 0.85;

export const Fragment = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CardContainer = styled.Image`
  width: ${(WIDTH * 296) / 360}px;
  height: ${(HEIGHT * 180) / 640}px;
`;

export const Message = styled.Text`
  margin-top: 15px;
  width: 85%;
  font-size: 14px;
  line-height: 35px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const MessageTitle = styled.Text`
  margin-top: 15px;
  width: 85%;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const TextBold = styled.Text`
  margin-top: 15px;
  width: 85%;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const LoadContainer = styled.View``;

export const InputContainer = styled.View`
  margin: 20px 20px 0 20px;
  width: 90%;
  flex-direction: column;
`;

export const Separator = styled.View`
  flex-grow: 1;
`;

export const ActionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 70px;
`;

export const CustonButton = styled(Button)`
  width: ${BTNWIDTH}px;
  margin-bottom: 8px;
`;
