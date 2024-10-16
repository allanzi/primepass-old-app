import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

import ButtonCustom from '../Button';

interface ImageProps {
  active?: boolean;
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  padding: 0 16px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ContainerWarnGPS = styled.View`
  border: 1px solid #515151;
  border-radius: 8px;
  margin-top: 16px;
  padding: 16px;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const TextBold = styled.Text`
  font-weight: bold;
`;

export const Button = styled(ButtonCustom)`
  margin-top: 24px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButtonOutline};
  font-size: 14px;
`;

export const Image = styled(FastImage)`
  margin-top: 16px;
  width: 264px;
  height: 160px;
  align-self: center;
`;

export const TouchableOpacity = styled.TouchableOpacity``;

export const Theater = styled(FastImage)<ImageProps>`
  width: 94px;
  height: 32px;
  resize-mode: cover;
  margin-right: 8px;
`;

export const ClearButton = styled.TouchableOpacity`
  width: 20px;
  height: 24px;
  justify-content: center;
`;
