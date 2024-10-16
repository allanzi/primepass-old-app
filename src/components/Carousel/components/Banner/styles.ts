import styled from 'styled-components/native';
import { css } from 'styled-components';

import ButtonRN from '../../../Button';
import ImageCustom from '../../../Image';

interface ButtonProps {
  outline?: boolean;
  disabled?: boolean;
}

interface LabelProps {
  buttonVisible?: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 40%;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const Image = styled(ImageCustom)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const Label = styled.View<LabelProps>`
  margin: 75% 32px 0 32px;
  ${(props: LabelProps) => {
    if (props.buttonVisible) {
      return css`
        margin-top: 53%;
      `;
    }
  }}

`;

export const Title = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 32px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  margin: 8px auto;
  ${({ theme }) => (css`
    background: rgba(21, 21, 21, 0.3)';
    border-width: 2px;
    border-color: ${theme.colors.primaryBlue};
  `)}
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${({ theme }) => theme.colors.colorTextButton};
`;
