import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { css } from 'styled-components';

const WIDTH = Dimensions.get('window').width;

interface StepProps {
  status?: string;
}

interface DivisorProps {
  active?: boolean;
}

export const Container = styled.View`
  width: ${WIDTH}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0;
  margin-bottom: 24px;
`;

export const ContainerStep = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Step = styled.View<StepProps>`
  border-radius: 100px;
  width: 64px;
  align-items: center;
  justify-content: center;
  height: 18px;
  padding-top: 2.3px;
  margin-bottom: 6px;

  ${(props) => {
    switch (props.status) {
      case 'active':
        return css`
          border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
        `;
      case 'disabled':
        return css`
          border: 1px solid ${({ theme }) => theme.colors.colorBorderInputNotFocused};
          background-color: ${({ theme }) => theme.colors.backgrounButtonDisable};

        `;
      case 'complete':
        return css`
          border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
          background-color: ${({ theme }) => theme.colors.primaryBlue};
          `;
      default:
        return css`
          border: 1px solid ${({ theme }) => theme.colors.colorBorderInputNotFocused};
        `;
    }
  }}
`;

export const Label = styled.Text<DivisorProps>`
  font-size: 14px;
  line-height: 14px;
  ${({ theme, active }) => (
    css`
    color: ${active
      ? theme.colors.white
      : theme.colors.colorBorderInputNotFocused};
    `)
}
`;

export const LabelBottom = styled.Text<StepProps>`
  font-size: 12px;
  line-height: 12px;

  ${(props) => {
    switch (props.status) {
      case 'active':
        return css`
        color: ${({ theme }) => theme.colors.white};
        `;
      case 'disabled':
        return css`
        color: ${({ theme }) => theme.colors.colorBorderInputNotFocused};
        `;
      case 'complete':
        return css`
          color: ${({ theme }) => theme.colors.colorUtilized};
          `;
      default:
        return css`
          color: ${({ theme }) => theme.colors.colorBorderInputNotFocused};
        `;
    }
  }}
`;

export const Icon = styled.Image`
  width: 12px;
  height: 12px;
`;

export const Divisor = styled.View<DivisorProps>`
  border-top-width: 1px;
  width: 34px;
  align-self: flex-start;
  margin-top: 8px;

  ${({ theme, active }) => (
    css`
    border-color: ${active
      ? theme.colors.primaryBlue
      : theme.colors.colorBorderInputNotFocused};
    `)
}
`;
