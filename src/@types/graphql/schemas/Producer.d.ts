import type { Payload, Maybe } from './defaults';

/** Producer detail */
export interface Producer extends Payload<'Producer'> {
  /** The name of the Producer */
  name: Maybe<string>;
  /** The logo of the Producer */
  logo: Maybe<string>;
}
