import type { Payload, Maybe } from './defaults';
import type { ContentService } from './ContentService';

/** Service content search */
export interface ServiceContentSearch extends Payload<'ServiceContentSearch'> {
  /** Result content details */
  details: Maybe<Array<Maybe<ContentService>>>;
}
