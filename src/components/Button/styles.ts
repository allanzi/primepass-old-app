import styled, { css } from 'styled-components/native';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

interface ContainerWrapper extends TouchableOpacityProps {
  readonly disable: boolean;
  readonly outline?: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerWrapper>`
  width: 100%;
  height: 55px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;

  ${({ outline, theme, disable }) => (!outline
    ? css`
          background: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.primaryBlue};
        `
    : css`
          background: ${theme.colors.background};
          border-width: 2px;
          border-color: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.primaryBlue};
        `)}
`;

export const ButtonText = styled.Text<ContainerWrapper>`
  color: ${({ theme, disable }) => (disable
    ? theme.colors.colorTextButtonDisable
    : theme.colors.colorTextButton)};
  font-size: 18px;
`;
