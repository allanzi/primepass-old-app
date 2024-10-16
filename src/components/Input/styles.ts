import styled, { css } from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  isFocused: boolean;
  error: string | undefined;
}

interface ErrorProps {
  errorCenter?: boolean;
}

interface TextInputProp extends TextInputProps {
  error: string | undefined;
}

export const Container = styled.View<ContainerProps>`
  background: transparent;
  width: 100%;
  height: 55px;

  padding: 0 16px;
  margin-bottom: 15px;

  border-radius: 100px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.colorBorderInputNotFocused};

  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  ${({ isFocused }) => isFocused
    && css`
      border-color: ${({ theme }) => theme.colors.colorBorderInput};
    `}

  ${({ error }) => error
    && css`
      border-color: ${({ theme }) => theme.colors.colorError};
    `}
`;

export const TextInput = styled.TextInput<TextInputProp>`
  flex: 1;
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 16px;

  ${({ error }) => error
    && css`
      color: ${({ theme }) => theme.colors.colorError};
    `}
`;

export const ErrorText = styled.Text<ErrorProps>`
  color: ${({ theme }) => theme.colors.colorError};
  font-size: 12px;
  text-align: right;
  ${({ errorCenter }) => errorCenter
    && css`
      text-align: center;
    `}
`;

export const ErrorContainer = styled.View<ErrorProps>`
  height: 25px;
  align-self: flex-end;
  ${({ errorCenter }) => errorCenter
    && css`
      align-self: center;
    `}
`;

export const SetEmptyButton = styled(RectButton)``;

export const LabelContainer = styled.View`
  padding: 8px 0;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.colorLabel};
  font-size: 16px;
`;
