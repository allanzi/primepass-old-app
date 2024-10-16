import styled, { css } from 'styled-components/native';

interface LabelProps {
  hasError: boolean;
}

interface MenuItemProps {
  disabled: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
`;

export const HeadContainer = styled.View`
  height: auto;
`;

export const Section = styled.View``;

export const Title = styled.Text`
  width: 85%;
  margin: 20px 0 0 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const TextPhone = styled.Text`
  font-size: 20px;
  margin: 5px 20px 10px 20px;
  color: ${({ theme }) => theme.colors.colorInfoText};
  font-weight: bold;
`;

export const Footer = styled.View`
  align-self: flex-start;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 64px;
`;

export const Timer = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const Label = styled(Timer)<LabelProps>`
  color: ${({ theme }) => theme.colors.colorTextNotRecivedCode};
  ${({ hasError }) => hasError
    && css`
      color: ${({ theme }) => theme.colors.colorError};
    `}
`;

export const NotReceivedContainer = styled.View`
  justify-content: flex-end;
  align-items: flex-start;
`;

export const MenuContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 32px;
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
  margin-left: 20px;
`;

export const MenuLabel = styled.Text<MenuItemProps>`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.white};
  ${({ disabled }) => disabled
    && css`
      color: ${({ theme }) => theme.colors.colorTextDisabled};
    `}
`;

export const MenuLabelComment = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const MenuIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;
