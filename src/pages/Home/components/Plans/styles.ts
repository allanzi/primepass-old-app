import styled, { css } from 'styled-components/native';

import ButtonRN from '../../../../components/Button';

interface ButtonProps {
  outline?: boolean;
}

interface PlanProps {
  aditional?: boolean;
  color: string;
}

export const Container = styled.View`
  padding: 16px 16px 0 16px;
  border: 1px solid #515151;
  border-radius: 8px;
  margin: 8px 16px;
  display: flex;
  flex: 1;
`;

export const Title = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-bottom: 4px;
  align-self: flex-start;
`;

export const Plan = styled.View<PlanProps>`
  height: 40px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  margin: 4px 0;
  flex-direction: row;
  align-items: center;
  background: ${(props) => (props.color ? props.color : '#212121')};

  ${(props: PlanProps) => {
    if (props.aditional) {
      return css`
        background: ${({ theme }) => theme.colors.backgroundModalDetails};
        border-top-width: 8px;
        border-color: ${({ theme }) => theme.colors.primaryBlue};
        border-radius: 8px;
        padding-bottom: 2px;
      `;
    }
  }}
`;

export const Icon = styled.Image`
  height: 24px;
  width: 24px;
  resize-mode: contain;
  margin-left: 16px;
`;

export const NamePlan = styled.Text`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 16px;
`;

export const ContentActions = styled.View`
  margin-bottom: 12px;
  margin-top: 16px;
`;

export const Button = styled(ButtonRN)<ButtonProps>`
  margin: 4px 0;
  height: 40px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButton};
  font-size: 14px;
`;
