import type { Maybe, Payload } from './defaults';
import type { ContentService } from './ContentService';

/** A query to return the list of film premieres */
export interface PremieresList extends Payload<'PremieresList'> {
  /** Movie details */
  movies: Maybe<Array<Maybe<ContentService>>>;
  /** The quantity of movies per page */
  per_page: Maybe<number>;
  /** The movie page */
  page: Maybe<number>;
}
