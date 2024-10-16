import { ContentService } from './ContentService';
import type { Payload, Maybe } from './defaults';

/** Customized content list */
export interface CustomContentList extends Payload<'CustomContentList'> {
  /** Custom content list */
  content: Maybe<Array<Maybe<CustomContent>>>;
}

/** Customized content */
export interface CustomContent extends Payload<'CustomContent'> {
  /** The unique id of custom block */
  id: Maybe<string>;
  /** Title */
  title: Maybe<string>;
  /** Subtitle */
  subtitle: Maybe<string>;
  /** Description */
  description: Maybe<string>;
  /** Date to starts show */
  startDate: Maybe<string>;
  /** Date to ends show */
  finishDate: Maybe<string>;
  /** Priority */
  priority: Maybe<number>;
  /** Image format (landscape | portrait) */
  imageFormat: Maybe<string>;
  /** This Custom Content is active */
  active: Maybe<boolean>;
  /** Custom contente catalog */
  catalog: Maybe<Array<Maybe<ContentService>>>;
}
