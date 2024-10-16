import styled, { css } from 'styled-components/native';

import ButtonCustom from '../../../../components/Button';

interface ButtonProps {
  disable: boolean;
  green: boolean;
}

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ScrollView = styled.ScrollView``;

export const ContainerPayment = styled.View`
  margin: 16px;
`;

export const CardContainer = styled.View``;

export const Title = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const ContainerWarning = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Warning = styled.Text`
  font-size: 10px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.colorError};
  text-align: center;
  margin-left: 4px;
`;

export const Button = styled(ButtonCustom)<ButtonProps>`
  width: 90%;
  margin: 24px auto;
  ${({ theme, green, disable }) => (green
    ? css`
      background: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.backgroundConfirmTicket}
    `
    : css`
      color: ${theme.colors.primaryBlue}
    `)
}
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 16px;
  ${({ theme, disable }) => (disable
    ? css`
      color: ${theme.colors.colorTextButtonDisable}
    `
    : css`
      color: ${theme.colors.white}
    `)
}
`;

export const WalletContainer = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.colorTextButtonDisable};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowSwitch = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Balance = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 16px;
`;
