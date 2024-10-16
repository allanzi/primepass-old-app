import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Image = styled(FastImage)`
  width: 26px;
  height: 26px;
  margin-right: 20px;
  margin-top: -4px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView`
  flex: 1;
  margin: 0 24px 0;
`;

export const PageSubTitle = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
  margin: 0 8px 30px 8px;
`;

export const PartnersContainer = styled.View`
  margin: 16px 12px 0 12px;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: ${Platform.OS === 'ios' ? '10px' : '0px'};
`;

export const TextWhite = styled.Text`
  color: #fff;
  text-align: center;
`;

export const ContainerCompany = styled.View``;

export const Company = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 12px;
  border-width: 0;
  border-style: solid;
  border-color: #515151;
  border-bottom-width: 1px;
`;

export const Label = styled.Text`
  color: #cccccc;
  font-size: 16px;
`;

export const Left = styled.View`
  flex-direction: row;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #515151;
`;

export const ClearButton = styled.TouchableOpacity`
  width: 16px;
  height: 24px;
  justify-content: center;
`;
