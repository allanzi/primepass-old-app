import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

import Button from '../../../../components/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

interface CardImageProps {
  selected?: boolean;
}

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View``;

export const CardContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Title = styled.Text`
  margin-bottom: 16px;
  align-self: flex-start;
  text-align: left;
  font-size: 14px;
  letter-spacing: 0px;
  color: #cccccc;
  opacity: 1;
`;

export const SubTitle = styled.Text`
  margin-bottom: 16px;
  font-size: 12px;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

export const Separator = styled.View`
  margin: 8px;
`;

export const SaveButton = styled(Button)`
  margin-top: 32px;
  width: ${(WIDTH * 296) / 360}px;
  height: 50px;
  background-color: #147eb5;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
`;

export const CardImageContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  flex-direction: row;
`;
export const CardImage = styled(FastImage)<CardImageProps>`
  align-self: flex-start;
  width: ${(WIDTH * 35) / 360}px;
  height: ${(HEIGHT * 24) / 640}px;
  margin-right: 8px;
`;

export const Icon = styled(FastImage)`
  width: ${(WIDTH * 16) / 360}px;
  height: ${(HEIGHT * 16) / 640}px;
  margin-left: 10px;
`;

export const IconButton = styled.TouchableOpacity`
  width: ${(WIDTH * 16) / 360}px;
  height: ${(HEIGHT * 16) / 640}px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 16px;
  margin-left: 4px;
`;

export const FormContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding-top: 32px;
`;

export const GroupContainer = styled.View`
  align-self: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
`;

export const CardNumberContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  width: ${(WIDTH * 299) / 360}px;
`;

export const ValidateContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  width: ${(WIDTH * 181) / 360}px;
`;

export const CVVContainer = styled.View`
  margin-left: 8px;
  justify-content: flex-end;
  align-items: center;
  width: ${(WIDTH * 110) / 360}px;
`;
