import type { Maybe, Payload } from './defaults';
import type { CreditCardToken } from './CreditCardToken';
import type { Credits } from './CreditType';
import type { Address } from './Address';
import type { UserSignature } from './UserSignature';

/** User details */
export interface UserDetails extends Payload<'UserDetails'> {
  /** User ID */
  id: Maybe<string>;
  /** User name */
  name: Maybe<string>;
  /** User email */
  email: Maybe<string>;
  /** User phone */
  phone: Maybe<string>;
  /** User document */
  document: Maybe<string>;
  /** User profile picture */
  profilePicture: Maybe<string>;
  /** Indication if user cadaster is verified */
  verified: Maybe<boolean>;
  /** total credits available */
  availableCredits: Maybe<number>;
  /** User address list */
  address: Maybe<Address>;
  /** Signed services */
  signatures: Maybe<Array<Maybe<UserSignature>>>;
  /** User credit list */
  credits: Maybe<Array<Maybe<Credits>>>;
  /** Returns the data of the registered card */
  creditCards: Maybe<Array<Maybe<CreditCardToken>>>;
}
