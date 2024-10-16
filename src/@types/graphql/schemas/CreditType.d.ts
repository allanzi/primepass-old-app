import type { Maybe, Payload } from './defaults';
import type { Rules } from './Rules';

/** An Credit */
export interface CreditType extends Payload<'CreditType'> {
  /** The unique id of CreditType */
  id: Maybe<string>;
  /** Credit type name */
  name: Maybe<string>;
  /** Credit type rules */
  rules: Maybe<Rules>;
}

/** An Credit */
export interface Credits extends Payload<'Credits'> {
  /** The unique id of Credit */
  id: Maybe<string>;
  /** Returns whether the credit is used or not */
  used: Maybe<boolean>;
  /** Credit validity start data */
  startDate: Maybe<string>;
  /** Credit validity finish data */
  finishDate: Maybe<string>;
  /** Return of credit types */
  creditType: Maybe<CreditType>;
}
