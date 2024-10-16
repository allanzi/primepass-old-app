import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const DataContainer = styled.View`
  margin: -80px 20px 0 20px;
  border-color: ${({ theme }) => theme.colors.colorBorderInputNotFocused};
`;

// links

export const LinksContainer = styled.View`
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-around;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Link = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.colorInfoText};
  height: 25px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-left: 10px;
`;

export const LinkText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.colorInfoText};
`;

export const LoadContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const CardContainer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  padding-left: 4%;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.colorText};
`;
// modal inside

export const AcceptContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  border-bottom-width: 1px;
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

export const CancelContainer = styled.View``;

export const CancelButton = styled.TouchableOpacity`
  padding: 5px 0;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const CancelText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`;

export const WithoutPlan = styled.View`
  width: 94%;
  height: 60px;
  margin-top: 10px;
  background: #313131;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  justify-content: center;
`;

export const WithoutPlanText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

export const MenuContainer = styled.View`
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 16px 16px 16px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const MenuSeparator = styled.View`
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

export const MenuInfo = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const MenuLabel = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const MenuLabelComment = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const MenuIcon = styled.Image`
  width: 26px;
  height: 26px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const ContainerLoader = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  line-height: 22px;
  font-size: 12px;
  margin-bottom: 8px;
`;
