export interface PlanCoreProps {
  name: string;
  logo: string;
  color: string;
  isGradient?: boolean;
  expirationDate: string;
  services: Array<any>;
  ticketsQuantity: number;
  ticketRenew: string;
  screen: string;
  room: string;
  availability: string;
  period: string;
  parentSignature: ParentSignature;
  isB2C?: boolean;
}

interface ParentSignature {
  id: string;
  dateCancel: Date;
}
