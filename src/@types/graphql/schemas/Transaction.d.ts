import { Address } from './Address';
import { Cinema } from './Cinema';
import type { Payload } from './defaults';

export interface TransactionList extends Payload<'TransactionList'> {
  total_pages: number;
  page: number;
  per_page: number;
  transactions: Array<Transaction>;
}

export interface Transaction extends Payload<'Transaction'> {
  id: string;
  userId: string;
  amount: number;
  status: string;
  ttl: number;
  expireAt: string;
  updatedAt: string;
  solicitation: Solicitation;
  ticketCodes: Array<TicketCode>;
  transactionItems: Array<TransactionItem>;
}

export interface Solicitation extends Payload<'Solicitation'> {
  rooms: Array<string>;
  screens: Array<string>;
  days: Array<number>;
  theater: Theater;
}

export interface Theater extends Payload<'Theater'> {
  id: string;
  name: string;
  seat: boolean;
  theaterUrl: string;
  cinema: Cinema;
  address: Address;
}

export interface TicketRedemption extends Payload<'TicketRedemption'> {
  steps: Array<string>;
}

export interface TicketCode extends Payload<'TicketCodes'> {
  code: string;
}

export interface TransactionItem extends Payload<'TransactionItem'> {
  quantity: number;
  itemType: string;
}
