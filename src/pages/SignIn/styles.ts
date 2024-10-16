import styled from 'styled-components/native';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Image = styled(FastImage)`
  width: 19px;
  height: 23px;
  margin-right: 20px;
  margin-top: -4px;
  margin-left: 12px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const PhoneInputContainer = styled.View`
    margin: 0 20px 0 20px;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const TextPhoneInput = styled.Text`
  padding: 0 20px 30px 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Separator = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 30px 0;
  padding: 0 10px;
  width: 100%;
`;

export const LineSeparator = styled.View`
  height: 1px;
  width: 45%;
  background: ${({ theme }) => theme.colors.colorTextButtonDisable};
`;

export const TextSeparator = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButtonDisable};
  margin: 0 5px;
  font-size: 18px;
`;

export const ThirdPartAccessContainer = styled.View`
  height: 250px;
  justify-content: space-between;
  margin: 0 20px;
`;

export const LoadContainer = styled.View``;

export const OrContainer = styled.View`
  flex-direction: row;
  padding: 0 32px;
  margin-top: 26px;
`;

export const Line = styled.View`
  background-color: #515151;
  height: 1px;
  flex: 1;
  align-self: center;
`;

export const OrText = styled.Text`
  align-self: center;
  padding-horizontal: 5px;
  font-size: 16px;
  color: #515151;
`;

export const OtherLoginFormContainer = styled.View`
  padding: 0 20px;
  margin-top: 27px;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: ${Platform.OS === 'ios' ? '10px' : '0px'};
`;

export const TextWhite = styled.Text`
  color: #fff;
`;
