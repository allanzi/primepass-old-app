import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { css } from 'styled-components';

import ButtonRN from '../../../../components/Button';

const { width } = Dimensions.get('window');

interface ButtonProps {
  outline?: boolean;
  disabled?: boolean;
}

interface ContainerProps {
  noPadding?: boolean;
}

export const ImageContainer = styled.View`
  padding-top: 114px;
`;

export const Fragment = styled.View`
  display: flex;
  position: relative;
  flex: 1;
`;

export const Container = styled.View<ContainerProps>`
  ${({ noPadding }) => (
    css`
     padding: ${noPadding
      ? '32px 32px 0 32px'
      : '120px 32px'};
      `)
}
`;

export const Image = styled(FastImage)`
  width: ${width}px;
  height: 446px;
  align-self: center;
  position: absolute;
  top: 0px;
`;

export const GradientBottom = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 450px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-top: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  margin: 8px auto;

  ${({ outline, theme, disable }) => (!outline
    ? css`
          background: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.backgroundConfirmTicket};
        `
    : css`
          background: rgba(21, 21, 21, 0.3);
          border-width: 2px;
          border-color: ${disable
      ? theme.colors.backgrounButtonDisable
      : theme.colors.backgroundConfirmTicket};
        `)}

`;

export const ButtonText = styled.Text<ButtonProps>`
${({ theme, disable }) => (disable
    ? css`
      color: ${theme.colors.colorTextButtonDisable}
    `
    : css`
      color: ${theme.colors.colorTextButton}
      `)}
  `;
