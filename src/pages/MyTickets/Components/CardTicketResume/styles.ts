import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

interface TicketProps {
  disable: boolean;
}

export const CardContainer = styled.View`
  width: ${WIDTH}px;
  padding: 16px;
  padding-top: 0;
`;

export const ContentContainer = styled.View`
  padding: 0 10px;
  margin-top: 8px;
  flex: 1;
  flex-direction: column;
  border: ${({ disable }) => (disable ? '1px solid #313131' : '1px solid #515151')};
  border-radius: 8px;
`;

export const TicketsContainer = styled.View`
  flex-direction: row;
`;

export const QuantityContainer = styled.View`
  flex-direction: column;
  margin: 10px 0;
  align-items: center;
  width: 37%;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<TicketProps>`
  color: #fff;
  font-size: 12px;
  margin-right: 8px;
  margin-left: 4px;
  color: ${({ theme, disable }) => (disable ? '#515151' : theme.colors.white)};
`;

export const Ticket = styled.View<TicketProps>`
  background-color: ${({ disable }) => (disable ? '#313131' : '#6b6b6b')};
  width: 90px;
  height: 90px;
  border-radius: 8px;
  margin-right: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;

export const CreditText = styled.Text<TicketProps>`
  color: #fff;
  font-weight: bold;
  font-size: 32px;
  color: ${({ theme, disable }) => (disable ? '#515151' : theme.colors.white)};
`;

export const CreditComplementText = styled.Text<TicketProps>`
  color: #fff;
  font-size: 10px;
  text-align: center;
  width: 100px;
  color: ${({ theme, disable }) => (disable ? '#515151' : theme.colors.white)};
  margin-bottom: 8px;
`;

export const ContentTypes = styled.View``;

export const Plan = styled.View<TicketProps>`
  width: 60%;
  margin: 10px;
  justify-content: space-between;
`;

export const ContentType = styled.View``;

export const Types = styled.View`
  flex-direction: row;
  margin: 10px 0;
  flex-wrap: wrap;
`;

export const Box = styled.View`
  height: 35px;
  width: 90px;
  border: ${({ disable }) => (disable ? '1px solid #313131' : '1px solid #515151')};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 4px 4px 4px;
`;

export const Type = styled.Text`
  font-size: 16px;
  color: #cccccc;
  font-weight: bold;
`;

export const ContainerRedeem = styled.View``;

export const TitleRedeem = styled.Text<TicketProps>`
  font-size: 12px;
  margin-right: 8px;
  margin-left: 16px;
  color: #CCCCCC;
`;

export const DaysContainer = styled.View`
  flex-direction: row;
  margin-left: 32px;
  margin-top: 8px;
  margin-bottom: 24px;
  flex: 1;
`;

export const Day = styled.View`
  background-color: #6b6b6b;
  border-radius: 4px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 39px;
  height: 28px;
`;

export const DayLabel = styled.Text`
  font-size: 12px;
  line-height: 28px;
  color: #FFFFFF;`;

export const ContainerBottomText = styled.Text`
  margin: 0px 16px 32px 16px;
`;

export const BottomText = styled.Text`
  font-size: 10px;
  color: #cccccc;
  text-align: left;
`;

export const Link = styled.Text`
  font-size: 12px;
  text-decoration-line: underline;
  color: #72B1D2;
`;
