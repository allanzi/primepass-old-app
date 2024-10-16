import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';

export const InfoShareData = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  padding-top: 32px;
  line-height: 22px;
`;

export const ShareDataContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const InputCheckBox = styled(CheckBox)``;

export const label = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
  width: 90%;
  margin-left: 10px;
`;
