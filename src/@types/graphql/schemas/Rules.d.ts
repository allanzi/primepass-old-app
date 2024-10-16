import { Maybe, Payload } from './defaults';

/** User credit rules */
export interface Rules extends Payload<'Rules'> {
  /** Days of the week when the credit can be used */
  day: Maybe<Array<Maybe<string>>>;
  /** Rooms where credit can be used */
  room: Maybe<Array<Maybe<string>>>;
  /** Screen types where credit can be used */
  screen: Maybe<Array<Maybe<string>>>;
  /** Deration of the plan */
  duration: Maybe<number>;
  /** Number of credits for this rule */
  credits_quantity: Maybe<number>;
  /** Determines the start and end date of credits */
  credits_periodicity: Maybe<number>;
}
