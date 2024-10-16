import type { Payload, Maybe } from './defaults';
import type { ContentService } from './ContentService';

/** A query to return featured content list */
export interface CategoryList extends Payload<'CategoryList'> {
  category: Maybe<Array<Maybe<Category>>>;
  per_page: Maybe<number>;
  page: Maybe<number>;
}

/** A service content list */
export interface Category extends Payload<'Category'> {
  /** Category name */
  name: Maybe<string>;
  catalog: Maybe<Array<Maybe<ContentService>>>;
}
