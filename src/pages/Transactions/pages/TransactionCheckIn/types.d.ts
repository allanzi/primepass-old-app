import { Footer as FooterInterface } from '../../../../components/Dialog';
import { Transaction } from '../../../../@types/graphql/schemas';

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  type?: string | null;
  children?: any;
  footer?: FooterInterface[] | null;
  iconSuccess?: boolean;
  iconError?: boolean;
}

export interface Params {
  from?: string;
  theaterName: string;
  cinemaId: string;
  screenType: string;
  roomType: string;
  ticketQuantity: number;
  transactionId: string;
  address: string;
  ttl: number;
  status?: string;
  transaction?: Transaction;
}
