import type { Payload, Maybe } from './defaults';
import type { Address } from './Address';

/** An specific User */
export interface User extends Payload<'User'> {
  /** The unique id of User */
  id: Maybe<string>;
  /** User address list */
  address: Maybe<Array<Maybe<Address>>>;
  /** The name of User */
  name: Maybe<string>;
  /** User document */
  document: Maybe<string>;
  /** User picture */
  profilePicture: Maybe<string>;
  /** The email of User */
  email: Maybe<string>;
  /** The phone of User */
  phone: Maybe<number>;
  /** The password of User */
  password: Maybe<string>;
  /** Indication if user cadaster is verified */
  verified: Maybe<boolean>;
}
