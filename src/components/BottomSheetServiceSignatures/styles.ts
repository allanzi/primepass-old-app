import { css } from 'styled-components';
import styled from 'styled-components/native';

import ButtonRN from '../Button';

interface ButtonProps {
  outline?: boolean;
  disable?: boolean;
}

export const ContainerHeader = styled.View`
  margin: 16px auto 0 auto;
  max-width: 320px;
`;

export const ContainerFooter = styled.View`
  margin: 16px auto;
  max-width: 320px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  line-height: 21px;
  margin: 16px;
  text-align: center;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 12px;
  line-height: 19px;
  text-align: left;
  margin-bottom: 4px;
`;

export const Image = styled.Image`
  max-width: 100%;
  max-height: 100px;
  height: 50px;
  width: 150px;
  resize-mode: contain;
  margin: 12px auto 0px auto;
`;

export const ContainerRegisters = styled.View`
  margin: 0 0 8px 0;
  justify-content: center;
  align-items: center;
`;

export const Register = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundModalDetails};
  max-width: 320px;
  border-radius: 8px;
  margin: 4px auto;
  padding: 8px 0px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin: 0 24px;
  padding: 0 4px;
`;

export const ColumnDate = styled.View`
  width: 80%;
  align-items: flex-start;
`;

export const ColumnStatus = styled.View`
  width: 20%;
  align-items: flex-start;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  line-height: 21px;
  text-align: center;
`;

export const Actions = styled.View`
  align-items: center;
  margin: 0 24px 0 24px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  width: 100%;
  height: 22px;
  margin: 12px 0 4px 0;

  ${({ outline, theme, disable }) => (!outline
    ? css`
          background: ${disable
      ? theme.colors.colorTextButtonDisable
      : theme.colors.primaryBlue};
        `
    : css`
          background: transparent;
          border-width: 2px;
          border-color: ${disable
      ? theme.colors.colorTextButtonDisable
      : theme.colors.primaryBlue};
        `)}

`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white}
`;
