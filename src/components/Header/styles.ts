import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';

interface ContainerProps {
  title?: string;
  translucent?: boolean;
  status: string;
}

interface TitleProps {
  color?: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  ${Platform.OS === 'ios'
    ? css`
        margin-top: 0;
      `
    : css`
        margin-top: 30px;
      `}
  height: 60px;
  align-items: ${({ title }) => (title ? 'center' : 'flex-start')};
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  ${({ translucent, theme }) => (translucent
    ? css`
        background: transparent;
      `
    : css`
        background: ${theme.colors.background};
  `)}
  z-index: 100;

  ${({ status, theme }) => (status === 'canceled'
      && css`
        background: red;
      `)
    || (status === 'paid'
      && css`
        background-color: ${theme.colors.primaryGreen};
      `)}
`;

export const BackButton = styled(BorderlessButton)`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0 10px;
`;

export const TitleContainer = styled.View`
  z-index: 100;
  margin-bottom: -5px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 18px;
  color: ${({ color }) => color};
`;

export const InvisibleContainer = styled.View`
  width: 40px;
  height: 40px;
  margin: 5px 10px 0 0;
`;
