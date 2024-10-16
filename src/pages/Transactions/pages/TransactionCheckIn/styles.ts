import styled from 'styled-components/native';

import ButtonCustom from '../../../../components/Button';

export const Container = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ScrollView = styled.ScrollView``;

export const Actions = styled.View``;

export const Button = styled(ButtonCustom)`
  width: 90%;
  margin: 8px auto;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
`;

export const Info = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.colorText};
  margin: 0px 16px 16px 16px;
`;

export const TextModal = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TextAlert = styled.Text`
  color: ${({ theme }) => theme.colors.colorError};
`;

export const ContainerLoader = styled.SafeAreaView`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  height: 500px;
  align-items: center;
  justify-content: center;
`;
