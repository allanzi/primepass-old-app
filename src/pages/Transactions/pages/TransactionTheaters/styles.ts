import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import ButtonCustom from '../../../../components/Button';

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const HeaderContainer = styled.View`
  margin: 20px;
`;

export const ContainerLoader = styled.View`
  margin: 16px 0;
`;

export const ContentTheatersAvailableTitle = styled.View`
  margin: 16px;
`;

export const ContentTheatersAvailable = styled.View`
  margin: 4px 16px;
  height: 335px;
`;

export const TitleTheatersAvailable = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
  margin-bottom: 8px;
`;

export const ContainerEmpty = styled.View`
  border: 1px solid #515151;
  border-radius: 8px;
  margin-top: 16px;
  padding: 16px;
  align-items: center;
  margin: 16px;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Image = styled(FastImage)`
  margin-top: 16px;
  width: 264px;
  height: 160px;
  align-self: center;
`;

export const Button = styled(ButtonCustom)`
  margin-top: 24px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButtonOutline};
  font-size: 14px;
`;
