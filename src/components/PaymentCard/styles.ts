import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
interface ContainerProps {
  color: string;
  background: string;
}

export const Container = styled.View<ContainerProps>`
  margin-top: 8px;
  width: 100%;
  height: ${(HEIGHT * 48) / 640}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 8px;
  background-color: ${({ background, theme }) => (background || theme.colors.backgroundModal)};
`;

export const CardContainer = styled.View`
  width: 70%;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 10px 12px;
  flex-direction: row;
`;

export const CardLeftContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-right: 16px;
`;

export const CardRightContainer = styled.View`
  flex: 3;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export const CardButtons = styled.View`
  align-items: center;
  justify-content: flex-start;
  padding: 12px 10px 12px;
`;

export const BrandContainer = styled.View`
  width: 30%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const TypeTitle = styled.Text`
  font-size: 12px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.white};
  align-self: flex-start;
`;

export const Card = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

export const BrandTitle = styled.Text`
  text-align: left;
  font-size: 8px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.white};
`;

export const CardNumber = styled.Text`
  margin-left: 2px;
  font-size: 8px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Brand = styled(FastImage)`
  width: ${(WIDTH * 35) / 360}px;
  height: ${(HEIGHT * 24) / 640}px;
`;

export const Actions = styled(FastImage)`
  width: ${(WIDTH * 20) / 360}px;
  height: ${(HEIGHT * 20) / 640}px;
`;

export const SelectButton = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const Button = styled.TouchableOpacity``;

export const Delete = styled(FastImage)`
  width: ${(WIDTH * 20) / 360}px;
  height: ${(HEIGHT * 20) / 640}px;
`;

export const Edit = styled(FastImage)`
  width: ${(WIDTH * 20) / 360}px;
  height: ${(HEIGHT * 20) / 640}px;
  margin-right: 8px;
`;

export const ChangeIndicator = styled.ActivityIndicator`
  position: absolute;
  left: 50%;
`;
