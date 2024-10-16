import styled from 'styled-components/native';
import { Dimensions, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Button from '../../../../components/Button';

const { width } = Dimensions.get('window');

export const InputCheckBox = styled(CheckBox)``;

export const Fragment = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: ${width}px;
`;

export const Container = styled(ScrollView)`
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 26px;
  color: #FFFFFF;
  margin-top: 32px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const ContainerItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const Item = styled.Text`
  font-size: 12px;
  color: #FFFFFF;
  margin-left: 10px
`;

export const ContentReasons = styled.View`
  margin-bottom: 8px;
`;

export const ButtonStyled = styled(Button)`
  margin-top: 32px;
`;
