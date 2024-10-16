import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const ContainerActions = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 199;
`;

export const LeftSide = styled.View`
  flex: 2;
  margin: 5px 0 0 10px;
`;

export const CenterSide = styled.View`
  flex: 1;
`;

export const RightSide = styled.View`
  flex: 2;
  margin: 5px 10px 10px 10px;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: 35px;
  width: 150px;
  align-self: center;
`;

export const BackButton = styled(BorderlessButton)`
  background: transparent;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  z-index: 199;
  margin-bottom: 4px;
`;

export const Icon = styled.Image`
  width: 28px;
  height: 28px;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-right: 18px;
  align-self: flex-end;
`;
