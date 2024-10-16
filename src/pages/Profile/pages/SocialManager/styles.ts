import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const MenuContainer = styled.View`
  margin-top: 32px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MenuItem = styled.View`
  padding: 16px 16px 16px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const MenuInfo = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const MenuLabel = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MenuIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const MenuLabelComment = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.borderConfigColor};
`;
