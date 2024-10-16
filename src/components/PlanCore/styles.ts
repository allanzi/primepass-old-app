import styled from 'styled-components/native';
import { Animated } from 'react-native';

interface CardProps {
  color: string;
}

export const Card = styled.View`
  width: 100%;
`;

export const CardHeader = styled.View<CardProps>`
  width: 100%;
  height: 60px;
  background: ${(props) => (props.color ? props.color : '#212121')};
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
`;

export const PlanContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 45%;
  margin-left: 16px;
`;

export const PartnerLogo = styled.Image`
  margin-right: 4px;
  max-width: 28px;
  min-width: 24px;
  max-height: 28px;
  min-height: 24px;
  resize-mode: contain;
`;

export const SignatureContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin-left: 10px;
`;

export const SignatureText = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  margin-left: 4px;
`;

export const PeriodText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  margin-left: 4px;
`;

export const ViewText = styled.View``;

export const ExpirationDate = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  opacity: 0.7;
  font-size: 9px;
`;

export const TicketImage = styled.Image`
  margin-right: 5%;
  height: 20px;
  width: 20px;
  align-self: center;
`;

export const CardContent = styled(Animated.View)<CardProps>`
  width: 100%;
  background: #313131;
`;

export const CardContentContainer = styled(Animated.View)`
  padding: 16px;
`;

export const SectionServices = styled.View`
  margin-bottom: 16px;
`;

export const ServicesContainer = styled.View`
  flex-direction: row;
`;

export const SectionCinema = styled.View``;

export const TitleSection = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const TextContent = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: normal;
  margin-right: 10px;
`;

export const TicketContainer = styled.View`
  flex-direction: row;
  border: 2px solid #515151;
  border-radius: 100px;
  height: 40px;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const TicketsInfo = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: normal;
  margin-left: 8px;
`;

export const TicketsInfoSpan = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
`;

export const Availability = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: normal;
  margin-bottom: 2px;
`;

export const SpanAvailability = styled.Text`
  color: #66CF97;
  font-size: 10px;
  font-weight: bold;
  margin-right: 10px;
`;

export const Tickets = styled.View`
  flex-direction: row;
`;

export const TicketsAmount = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
`;

export const TicketsRecharge = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: normal;
`;

export const SpanRecharge = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
`;

export const SpanRechargeLink = styled.Text`
  font-size: 10px;
  color: #72B1D2;
  text-decoration: underline;
`;

export const CancelContent = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items:center;
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const CloseIcon = styled.View`
  height: 14px;
  display: flex;
  justify-content: center;
`;

export const Icon = styled.Image`
  height: 10px;
  width: 10px;
`;

export const TextCancel = styled.Text`
  color: #FFFFFF;
  font-size: 12px;
  font-weight: normal;
  margin-left: 8px;
  text-align: center;
`;

export const CanceledContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items:center;
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const TextCanceled = styled.Text`
  color: ${({ theme }) => theme.colors.colorError};
  font-size: 12px;
  font-weight: normal;
  margin-left: 4px;
  text-align: center;
`;

export const CardFooter = styled.TouchableOpacity<CardProps>`
  width: 100%;
  height: 24px;
  background: ${(props) => (props.color ? props.color : '#212121')};
  border-radius: 8px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const MyticketsLink = styled.TouchableOpacity``;
