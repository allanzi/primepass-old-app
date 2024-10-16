import styled, { css } from 'styled-components/native';
import { TextProps } from 'react-native';

type Align = 'flex-start' | 'center' | 'flex-end';
interface ErrorProps extends TextProps {
  bold?: boolean;
  align?: Align;
}

export const Container = styled.View`
  width: 100%;
  margin-top: 30px;
`;

export const InputContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-left: 20px;
  justify-content: center;
`;

export const ErrorMessage = styled.Text<ErrorProps>`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.colorError};
  margin-top: 10px;
  margin-right: 50px;
  align-self: ${({ align }) => (align || 'flex-end')};
  ${({ bold }) => bold && css`
    font-weight: 800;
  `}
`;
