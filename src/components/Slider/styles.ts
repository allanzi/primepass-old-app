import styled, { css } from 'styled-components/native';
import { Pressable, Animated } from 'react-native';

interface ButtonProps {
  active: boolean;
}

interface ItemProps {
  index: number;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
`;

const Button = styled(Pressable)`
  height: 70px;
  width: 54px;
  align-items: center;
  justify-content: center;
  background: #313131;
`;

export const ButtonRight = styled(Button)<ButtonProps>`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  ${({ active, theme }) => active
    && css`
      background: ${theme.colors.primaryBlue};
    `}
`;

export const ButtonLeft = styled(Button)<ButtonProps>`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  ${({ active, theme }) => active
    && css`
      background: ${theme.colors.primaryBlue};
    `}
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const ContainerTicketsList = styled.ScrollView``;

export const Item = styled(Pressable)`
  background: #515151;
  height: 70px;
  width: 73px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.colorLabel};
`;

export const ActiveItem = styled(Item)`
  background: ${({ theme }) => theme.colors.white};
  height: 76px;
  width: 79px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const DisabledItem = styled.View<ItemProps>`
  background: #313131;
  color: #515151;
  height: 70px;
  width: 73px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-color: #6b6b6b;
  ${({ index }) => index === 0
    && css`
      border-left-width: 1px;
    `}
`;

export const TextItem = styled(Animated.Text)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 24px;
`;

export const TextItemActive = styled(TextItem)`
  color: ${({ theme }) => theme.colors.borderConfigColor};
`;
