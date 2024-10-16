import type { Payload } from './defaults';

export interface Cinema extends Payload<'Cinema'> {
  id: string;
  name: string;
  logo: string;
  color: string;
  url: string;
  isActive: boolean;
  ticketRedemption: TicketRedemption;
}

export interface CinemaList extends Payload<'CinemaList'> {
  cinemas: Array<Cinema>;
}

export interface TicketRedemption extends Payload<'TicketRedemption'> {
  steps: Array<string>;
}
