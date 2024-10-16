import { Footer as FooterInterface } from '../Dialog';

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  type?: string | null;
  children?: any;
  footer?: FooterInterface[] | null;
}

export interface TransactionCheckInCodesProps {
  codes: Array<Code>;
  days: Array<number>;
  hasSeat: boolean;
  seatUrl?: string;
  steps: Array<string>;
}

export interface Code {
  code: string;
}
