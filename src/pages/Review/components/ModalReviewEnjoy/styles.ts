import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

import Button from '../../../../components/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const InsideModalContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundModal};
  width: ${(WIDTH * 288) / 360}px;
  height: 85%;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  z-index: 199;
`;

export const ModalCloseButtonContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: ${(HEIGHT * 36) / 640}px;
  padding: 13px;
`;

export const ModalCloseButton = styled.TouchableOpacity``;

export const ModalCloseIcon = styled.Image`
  width: 16px;
  height: 16px;
  opacity: 1;
`;

export const ModalBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const ModalBodyTop = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const ModalBodyImage = styled(FastImage)`
  margin-top: ${(HEIGHT * 16) / 640}px;
  width: ${(WIDTH * 256) / 360}px;
  height: ${(HEIGHT * 145) / 640}px;
`;

export const ModalBodyText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0px;
  line-height: 18px;
  opacity: 1;
  text-align: center;
  margin-top: 24px;
  font-size: 12px;
`;

export const ModalTitle = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ModalTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0px;
  opacity: 1;
  text-align: center;
  font-size: 20px;
`;

export const ModalButtons = styled.View`
  width: 90%;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

export const ModalButton = styled(Button)`
  margin-top: 8px;
`;

export const ModalButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0px;
  text-align: center;
  opacity: 1;
`;
