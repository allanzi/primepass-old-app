import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  background: transparent;
  width: 100%;
  height: 55px;

  padding: 0 16px;
  margin-bottom: 15px;

  border-radius: 25px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.colorBorderInputNotFocused};

  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  ${({ isFocused }) => isFocused
    && css`
      border-color: ${({ theme }) => theme.colors.colorBorderInput};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.colorError};
  font-size: 12px;
  text-align: right;
`;

export const ErrorContainer = styled.View`
  height: 25px;
`;
