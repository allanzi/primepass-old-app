import { css } from 'styled-components';
import styled from 'styled-components/native';

interface InputProps {
  active?: boolean;
}

export const LeftSide = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CenterSide = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

export const RightSide = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  color: #fff;
  width: 100%;
  flex: 1;
  font-size: 18px;
`;

export const InputContainer = styled.View<InputProps>`
  border-style: solid;
  border-width: 2px;
  height: 50px;
  border-radius: 50px;
  flex-direction: row;
  overflow: hidden;
  padding: 0px 10px 0px 10px;
  margin: 0px 10px 0px 10px;

  ${({ theme, active }) => (
    css`
    border-color: ${active
      ? theme.colors.colorBorderInput
      : theme.colors.colorBorderInputNotFocused};
    `)
}
`;

export const ClearButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;
