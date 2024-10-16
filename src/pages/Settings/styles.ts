import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Item = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const ContainerInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.Image`
  width: 23px;
  height: 23px;
  margin-right: 10px;
`;

export const IconBack = styled.Image`
  width: 15px;
  height: 15px;
`;

export const Info = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const Label = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Caption = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const VersionCode = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-left: 32px;
  position: absolute;
  bottom: 64px;
`;
