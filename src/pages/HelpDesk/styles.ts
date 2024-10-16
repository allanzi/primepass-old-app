import styled from 'styled-components/native';

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
  flex: 1;
`;

export const Content = styled.View``;

export const Text = styled.Text``;

export const MenuItem = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const Label = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const IconMenu = styled.Image`
  width: 30px;
  height: 30px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const VersionCode = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-left: 32px;
  position: absolute;
  bottom: 24px;
`;
