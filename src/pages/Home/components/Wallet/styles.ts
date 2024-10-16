import styled, { css } from 'styled-components/native';

import ButtonRN from '../../../../components/Button';

export const Container = styled.View`
  margin: 8px 16px;
  padding: 16px 16px 0 16px;
  border: 1px solid #515151;
  border-radius: 8px;
  flex: 1;
  display: flex;
`;

export const Title = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const ContentWallet = styled.View`
  align-self: flex-start;
  margin-left: 16px;
  padding-left: 16px;
  border-left-width: 1px;
  border-color: ${({ theme }) => theme.colors.backgroundModal}
  margin-bottom: 24px;
`;

export const Balance = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  padding-top: 8px;
  color: ${({ theme }) => theme.colors.white};
`;

export const LastRecharge = styled.Text`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 8px;
`;

export const ContentActions = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const Button = styled(ButtonRN)`
  height: 40px;
  margin: 4px 0;
`;

export const ButtonText = styled.Text`
  font-size: 14px;

  ${({ theme, disable }) => (disable
    ? css`
      color: ${theme.colors.colorTextButtonDisable}
    `
    : css`
      color: ${theme.colors.colorTextButton}
      `)}
`;
