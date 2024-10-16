import styled, { css } from 'styled-components/native';

import ButtonRN from '../../../../components/Button';

interface ButtonProps {
  outline?: boolean;
  disabled?: boolean;
}

interface TicketProps {
  disabled?: boolean;
}

export const Container = styled.View`
  margin: 8px 16px;
  padding: 16px 16px 0 16px;
  border: 1px solid #515151;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex: 1;
`;

export const Fragment = styled.View``;

export const Title = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const Span = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`;

export const Ticket = styled.View<TicketProps>`
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 0 16px 0;
  flex-direction: row;
  align-items: center;
  background:  ${({ theme }) => theme.colors.backgroundModal};

  ${(props: ButtonProps) => {
    if (props.disabled) {
      return css`
        background: ${({ theme }) => theme.colors.backgrounButtonDisable};
      `;
    }
  }}
`;

export const TicketQuantity = styled.Text<TicketProps>`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color:  ${({ theme }) => theme.colors.white};

  ${(props: ButtonProps) => {
    if (props.disabled) {
      return css`
        color: ${({ theme }) => theme.colors.colorTextButtonDisable};
      `;
    }
  }}
`;

export const ContentActions = styled.View`
  margin-bottom: 12px;
  margin-top: 16px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  height: 40px;
  margin: 4px auto;
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${({ theme }) => theme.colors.colorTextButton};
  font-size: 14px;
  ${(props: ButtonProps) => {
    if (props.disabled) {
      return css`
        color: ${({ theme }) => theme.colors.colorTextButtonDisable};
      `;
    }
  }}
`;
