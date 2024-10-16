import styled, { css } from 'styled-components/native';
import { TouchableOpacity as Touch } from 'react-native-gesture-handler';
import { Dimensions, TouchableOpacityProps } from 'react-native';

const { width } = Dimensions.get('window');
const BTNWIDTH = width * 0.85;

interface ButtonProps extends TouchableOpacityProps {
  outline?: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Message = styled.View`
  justify-content: center;
  padding: 0px 18px;
`;

export const MessageText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
  margin-bottom: 15px;
`;

export const HeadContainer = styled.View`
  height: auto;
`;

export const ActionsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 70px;
`;

export const Button = styled(Touch)<ButtonProps>`
  width: ${BTNWIDTH}px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-bottom: 10px;
  ${({ outline, theme }) => (!outline
    ? css`
          background: ${theme.colors.primaryBlue};
        `
    : css`
          background: ${theme.colors.background};
          border-width: 2px;
          border-color: ${theme.colors.primaryBlue};
        `)}
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 20px;
`;
