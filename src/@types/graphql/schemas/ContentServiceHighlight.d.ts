import type { Maybe, Payload } from './defaults';
import type { ContentService } from './ContentService';

/** Content Service Highlight */
export interface ContentServiceHighlight extends Payload<'ContentServiceHighlight'> {
  /** Content Service list */
  content_services: Maybe<Array<Maybe<ContentService>>>;
  /** The quantity of detaches per page */
  per_page: Maybe<number>;
  /** The detach page */
  page: Maybe<number>;
}
