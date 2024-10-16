import styled from 'styled-components/native';

import ButtonCustom from '../Button';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 0 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const TextMinimum = styled.Text`
  font-size: 8px;
  line-height: 9px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TextSmall = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Repel = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const Bold = styled.Text`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const TextBlue = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.colorInfoText};
`;

export const TextRed = styled.Text`
  color: ${({ theme }) => theme.colors.colorError};
`;

export const Day = styled.View`
  background: ${({ theme }) => theme.colors.colorLabel};
  border-radius: 4px;
  width: 38px;
  height: 20px;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

export const Actions = styled.View`
  margin-top: 24px;
`;

export const Button = styled(ButtonCustom)`
  width: 90%;
  margin: 8px auto;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
`;

export const CardWarning = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundModal};
  border-radius: 8px;
  padding: 10px 16px 16px 16px;
  margin: 32px 0;
`;

export const TextWarning = styled.Text`
  font-size: 10px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerTickets = styled.View``;

export const Ticket = styled.View`
  border: 2px solid #66CF97;
  border-radius: 100px;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const TextLarge = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 1;
  width: 90%;
`;

export const CopyContainer = styled.TouchableOpacity`
  width: 20px;
`;

export const ContainerPress = styled.TouchableOpacity``;

export const ContentHTML = styled.View`

`;
