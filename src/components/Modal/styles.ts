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
  background-color: ${({ theme }) => theme.colors.colorTextButtonDisable};
  width: 85%;
  /* height: 35%; */
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
  padding: 0 10px;
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

export const Message = styled.ScrollView`
  width: 100%;
  background: ${({ theme }) => theme.colors.borderConfigColor};
  padding: 25px 15px;
  height: 60%;
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

export const AcceptContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  min-height: 70px;
  max-height: 120px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => theme.colors.colorLabel};
`;

export const AcceptText = styled.Text`
  color: ${({ theme }) => theme.colors.colorError};
  font-size: 16px;
`;

export const AcceptButton = styled.TouchableOpacity`
  padding: 0 5px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const CancelContainer = styled.View`
  width: 100%;
  min-height: 70px;
  max-height: 120px;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  padding: 5px 0;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  width: 100%;
  margin-top: 15px;
  min-height: 60px;
  max-height: 120px;
  align-items: center;
  justify-content: center;

`;

export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`;

export const OptionList = styled.View`
  margin: 30px 0 30px 0;
  width: 70%;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 3px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const Circle = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`;

export const CheckedCircle = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 7px;
  border-color: ${({ theme }) => theme.colors.white};
`;

export const OptionText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  padding-left: 10px;
`;
