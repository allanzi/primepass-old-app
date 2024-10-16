import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import ButtonCustom from '../Button';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModal};
  border-radius: 8px;
`;

export const Header = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.colorLabel}
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Column = styled.View`
  flex-direction: column;
  width: 82%;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 18%;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  line-height: 16px;
`;

export const ContentSubtitle = styled.View`
  margin-top: 4px;
  flex-direction: row;
  width: 80%;
`;

export const PinText = styled.Text`
  font-weight: bold;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white};
  line-height: 12px;
  margin-left: 2px;
`;

export const Address = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.colorText};
  line-height: 12px;
  margin-left: 10px;
`;

export const Option = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  width: 40px;
`;

export const TitleOption = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.colorText};
  margin-top: 4px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
  line-height: 16px;
  margin: 16px 16px 8px 16px;
`;

export const ContentButtons = styled.View`
  margin: 24px 0 8px 0;
`;

export const Button = styled(ButtonCustom)`
  width: 90%;
  align-self: center;
  margin: 0px 0 8px 0;
  justify-content: center;
`;

export const ButtonImage = styled(TouchableOpacity)<ButtonProps>`
  width: 90%;
  height: 55px;
  align-self: center;
  margin: 8px 0 8px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primaryBlue};
  background: transparent;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorTextButtonOutline};
  font-size: 16px;
`;

export const ContentMovieList = styled.ScrollView`
  margin-left: 16px;
  flex-direction: row;
`;

export const ContentLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 0 0 16px;
`;

export const Link = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorInfoText};
  text-decoration: none;
`;
