import styled from 'styled-components/native';

import ButtonCustom from '../Button';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  flex: 1;
  border-radius: 8px;
  margin: 128px 16px 16px 16px;
  padding: 32px 16px;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Subtitle = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-top: 8px;
  margin-bottom: 32px;
  padding: 0 2px;
`;

export const Link = styled.Text`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.colorInfoText};
`;

export const ClearButton = styled.TouchableOpacity`
  width: 16px;
  height: 24px;
  justify-content: center;
`;

export const TitleMedium = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  margin: 32px 0;
`;

export const Session = styled.TouchableOpacity`
  border: 2px solid ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
`;

export const TextSession = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const ContainerChat = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  flex: 1;
  border-radius: 8px;
  margin: 16px 16px 32px 16px;
  padding: 32px 16px;
  align-items: center;
  z-index: 1;
`;

export const Button = styled(ButtonCustom)``;

export const ButtonText = styled.Text`
  font-size: 16px;
`;
