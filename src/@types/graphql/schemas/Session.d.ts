import type { Payload, Maybe } from './defaults';
import type { Attribute } from './Attribute';
import type { Theater } from './Theater';
import type { Movie } from './Movie';
import type { Transaction } from './Transaction';

/** An Session */
export interface Session extends Payload<'Session'> {
  /** The unique id of Session */
  id: Maybe<string>;
  /** The name of screen */
  roomName: Maybe<string>;
  /** the price of the session */
  price: Maybe<number>;
  /** Return the day of the week */
  weekday: Maybe<string>;
  /** Session data in Session */
  date: Maybe<string>;
  /** Session duration */
  hour: Maybe<string>;
  /** A list of Theater related of Session */
  theater: Maybe<Theater>;
  /** A list of Movie related of Session */
  movie: Maybe<Movie>;
  /** The Audio Type related of Session */
  audioType: Maybe<string>;
  /** The Screen Type related of Session */
  screenType: Maybe<string>;
  /** The Room Type related of Session */
  roomType: Maybe<string>;
  /** The Booking ID related of Session */
  bookingId: Maybe<string>;
  /** The attributes of Session */
  attributes: Maybe<Array<Maybe<Attribute>>>;
}

/** A query to return list of Movies */
export interface SessionsList extends Payload<'SessionsList'> {
  /** list of sessions details */
  sessions: Maybe<Array<Maybe<Session>>>;
  /** Total of Movies fetched */
  total_pages: Maybe<number>;
}

/** A query to return list of Movies */
export interface SessionsHistory extends Payload<'SessionsHistory'> {
  /** Transactions */
  transaction: Maybe<Array<Maybe<Transaction>>>;
  /** Total Sessions obtained */
  total_pages: Maybe<number>;
}
