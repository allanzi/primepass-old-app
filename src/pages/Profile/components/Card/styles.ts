import styled from 'styled-components/native';

interface CardProps {
  simple: boolean;
  color: string;
}

export const CardContainer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  padding-left: 4%;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Card = styled.View<CardProps>`
  width: 94%;
  height: 60px;
  margin-top: 10px;
  background: ${(props) => (props.color ? props.color : '#212121')};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;

  padding: 0 12px;
  justify-content: ${(props) => (props.simple ? 'flex-start' : 'space-between')};
`;

export const PlanContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PartnerLogo = styled.Image<CardProps>`
  margin-right: 5%;
  align-self: center;
`;

export const SignatureContainer = styled.View`
  flex-direction: column;
`;

export const TicketContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SignatureText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 14px;
`;
export const ExpirationDate = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  opacity: 0.7;
  font-size: 9px;
`;

export const TicketImage = styled.Image`
  margin-right: 5%;
  height: 27px;
  width: 27px;
  align-self: center;
`;
