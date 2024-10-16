import { css } from 'styled-components';
import styled from 'styled-components/native';
import ButtonCustom from '../Button';

interface ButtonProps {
  outline?: boolean;
}

export const Container = styled.View`
  margin: 32px auto 32px auto;
  padding: 10px 0;
  max-width: 320px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  line-height: 21px;
  margin-right: 12px;
  text-align: left;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  line-height: 18px;
  text-align: left;
  margin: 16px 0;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 16px;
  line-height: 18px;
  text-align: left;
  margin: 4px 0 4px 0;
`;

export const ContentInfo = styled.View`
  margin: 24px 0;
`;

export const ContentLogin = styled.View`
  margin-bottom: 16px;
`;

export const InputContainer = styled.View`
  margin: 20px 0 0 0;
  width: 100%;
  flex-direction: column;
`;

export const CopyContainer = styled.TouchableOpacity``;

export const IconCopy = styled.Image`
  width: 16px;
  height: 16px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  line-height: 21px;
  margin: 24px auto 0 auto;
  text-align: center;
`;

export const Button = styled(ButtonCustom)<ButtonProps>`
  margin-bottom: 8px;

  ${({ theme, outline }) => (
    css`
     background: ${outline
      ? 'transparent'
      : theme.colors.primaryBlue};
      `)
}
`;
