import type { Payload, Maybe } from './defaults';

/** An specific Credit Card Token */
export interface CreditCardToken extends Payload<'CreditCardToken'> {
  /** The unique id of Credit Card Token */
  id: Maybe<string>;
  /** Name of card holder */
  holder: Maybe<string>;
  /** card brand */
  brand: Maybe<string>;
  /** masked card number */
  masked: Maybe<string>;
  /** Card expiring date */
  expiration: Maybe<string>;
  /** Active card */
  isDefault: Maybe<boolean>;
}
