import styled, { css } from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity as Touch } from 'react-native-gesture-handler';
import {
  Dimensions,
  TouchableOpacityProps,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const BTNWIDTH = Platform.OS === 'android' ? (width - 40) : width - 40;

export const ContainerLoader = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface ButtonProps extends TouchableOpacityProps {
  outline?: boolean;
  disabled?: boolean;
}

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  align-items: center;
  flex: 1;
  margin: 16px;
`;

export const Image = styled(FastImage)`
  width: 100%;
  height: 220px;
`;

export const EmptyTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-top: 24px;
  align-self: flex-start;
`;

export const EmptySubtitle = styled.Text`
  font-size: 14px;
  color: #cccccc;
  margin-top: 24px;
  align-self: flex-start;
  line-height: 28px;
`;

export const ButtonsSignatureContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonPrimary = styled(Touch)<ButtonProps>`
  width: ${BTNWIDTH}px;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-top: 8px;

  ${({ outline, theme }) => (!outline
    ? css`
          background: #54BC94;
        `
    : css`
          background: ${theme.colors.background};
          border-width: 2px;
          border-color: #54BC94;
        `)}
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #FFFFFF;
`;

export const ContentContainer = styled.View`
  padding: 0 16px;
  flex: 1;
  flex-direction: column;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #cccccc;
  padding-left: 8px;
`;

export const Span = styled.Text`
  font-size: 14px;
  color: #ffffff;
`;

export const MenuContainer = styled.View`
  margin: 16px 0;
  border-width: .4px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 16px 16px 16px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const ContentInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MenuIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export const MenuInfo = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`;

export const MenuLabel = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const MenuLabelComment = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;
