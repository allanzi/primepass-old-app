import { Footer as FooterInterface } from '../Dialog';

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  children?: any;
  footer?: FooterInterface[] | null;
  iconSuccess?: boolean;
  iconError?: boolean;
}

export interface CheckInCardProps {
  step: number;
  ticketQuantity: number;
  timeRemain?: number;
  validDate?: string;
  screenType: string
  roomType: string;
  theaterLocation: TheaterLocation;
}

export interface TheaterLocation {
  theaterName: string;
  shoppingName: string;
  distance?: string;
  address: string;
}
