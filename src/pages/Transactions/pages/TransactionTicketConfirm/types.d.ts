import { Footer as FooterInterface } from '../../../../components/Dialog';

export interface Params {
  theaterName: string;
  rooms: Array<string>;
  screens: Array<string>;
  theaterId: string;
  address: string;
}

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  children?: any;
  footer?: FooterInterface[] | null;
  iconSuccess?: boolean;
  iconError?: boolean;
}

export enum DialogType {
  CONFIRM = 'confirm',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Upgrade {
  id: string;
  type: string;
  price: number;
  quantity: number;
  unit_price: number;
  field: string;
}

export interface CreditField {
  room: boolean;
  screen: boolean;
}

export interface TransactionSummary {
  credit_quantity: number;
  upgrade: Upgrade[];
  upgrade_total_amount: number;
  additional_quantity: number;
  additional_amount: number;
  total_amount: number;
  credit_field: CreditField;
}

export interface Error {
  hasError: boolean;
  message: boolean;
}

export interface CardProps {
  cardId: string;
  cardNumber: string;
  cardBrand: string;
  selected: boolean;
}
