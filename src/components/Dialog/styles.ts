import styled from 'styled-components/native';

import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

interface ErrorProps {
  error?: boolean;
}

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
  background-color: ${({ theme }) => theme.colors.colorTextButtonDisable};
  width: 85%;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  padding: 5px 0;
  z-index: 199;
`;

export const ModalTitle = styled.View`
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 0 32px;
  margin: 12px 0;
`;

export const ModalTitleText = styled.Text<ErrorProps>`
  font-size: 14px;
  color: ${({ theme, error }) => (error ? theme.colors.colorError : theme.colors.white)};
  text-align: center;
`;

export const ModalSubtitleText = styled.Text<ErrorProps>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorTextDisabled};
  text-align: center;
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Message = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.borderConfigColor};
  padding: 25px 15px;
`;

export const MessageText = styled.Text`
  line-height: 22px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.colorLabel};
`;

export const OkButton = styled.View`
  flex: 1;
  width: 100%;
  padding: 5px 0;
  height: 47px;
  align-items: center;
  justify-content: center;
`;

export const OkContainer = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`;

export const OkText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  line-height: 18px;
`;
