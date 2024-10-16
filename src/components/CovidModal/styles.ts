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
  flex: 1;
  bottom: 32px;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const InsideModalContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  width: 90%;
  border-radius: 100px;
  padding: 10px 4px;
  z-index: 199;
  min-height: 50px;
`;

export const Left = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 14px;
  padding-right: 10px;
  border-radius: 100px;
`;

export const Right = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-right: 14px;
  padding-left: 6px;
  border-radius: 100px;
`;

export const ContainerInfo = styled.View`
  flex-direction: column;
  width: 76%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.colorLabel};
  font-weight: bold;
  font-size: 13px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.colorLabel};
  font-size: 11px;
  line-height: 15px;
`;
