import type { Payload, Maybe } from './defaults';
import type { UserSignature } from './UserSignature';

/** Service History */
export interface ServiceHistory extends Payload<'ServiceHistory'> {
  /** Signatures */
  signatures: Maybe<Array<Maybe<UserSignature>>>;
  /** Total Services obtained */
  total_pages: Maybe<number>;
}
