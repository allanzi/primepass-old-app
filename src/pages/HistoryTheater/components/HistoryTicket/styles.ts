import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface BadgeProps {
  status?: string;
}

export const Wrapper = styled.SafeAreaView`
  height: 220px;
  width: ${width}px;
`;

export const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(21, 21, 21, 0.8);
  padding: 20px;
`;

export const TicketContent = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.colorBorderInputNotFocused};
  border-radius: 8px;
  height: 180px;
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const GenreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 7px;
`;

export const Span = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.white};
`;

export const BorderedText = styled.Text`
  color: #fff;
  padding: 1px 0;
  font-size: 8px;
  font-weight: bold;
`;

export const BorderContainer = styled.View`
  border: 1px solid #fff;
  border-radius: 8px;
  height: 14px;
  width: 50px;
  align-items: center;
  justify-content: center;
`;

export const TheaterInfo = styled.View`
  margin: 10px 0 15px 0;
`;

export const TheaterName = styled.Text`
  font-size: 12px;
  color: #fff;
  line-height: 20px;
`;

export const Address = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 8px;
`;

export const TicketsAmountBadge = styled.View`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primaryBlue};
  align-items: center;
  justify-content: center;
  width: 60px;
`;

export const StatusBadge = styled.View<BadgeProps>`
  ${({ status, theme }) => (status === 'paid'
    ? css`
          background: ${theme.colors.primaryGreen};
        `
    : css`
          background: ${theme.colors.colorError};
        `)}

  /* background: ${({ theme }) => theme.colors.primaryGreen}; */


  width: 55px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 60px;
  margin-left: 7px;
`;

export const StatusBadgeInTheatherHist = styled.View`
  width: 55px;
  border-radius: 10px;
  background: #db332e;
  align-items: center;
  justify-content: center;
  width: 60px;
  margin-right: 7px;
`;

export const BadgeText = styled.Text`
  font-size: 8px;
  color: #fff;
  padding: 2px 0;
`;

export const FooterTicket = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: -8px;
`;

export const SectionBorderRight = styled.View`
  height: 30px;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.colorBorderInputNotFocused};
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const FullDateContainer = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.colorBorderInputNotFocused};
  border-radius: 8px;
  margin-top: 3px;
  align-items: center;
  justify-content: center;
  width: 60px;
`;

export const FullDate = styled.Text`
  color: #fff;
  font-size: 8px;
  padding: 2px 0;
`;

export const Hour = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #fff;
`;

export const TextType = styled.Text`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 3px;
`;

export const LogoContainer = styled.View`
  width: 140px;
  height: 30px;
  margin-left: 5px;
`;

export const ServiceRoomLogo = styled.Image`
  height: 100%;
  width: 100%;
`;
