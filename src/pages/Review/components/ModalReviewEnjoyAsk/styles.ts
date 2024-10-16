import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const ModalWrapper = styled.View`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const ContainerContent = styled.View`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
  top: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const InsideModalContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundModal};
  width: ${(WIDTH * 288) / 360}px;
  height: ${(HEIGHT * 175) / 640}px;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  z-index: 199;
`;

export const ModalTitle = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(HEIGHT * 81) / 640}px;
`;

export const ModalTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.colorLabel};
`;

export const ModalButtons = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: ${(HEIGHT * 46) / 640}px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  text-align: center;
`;
