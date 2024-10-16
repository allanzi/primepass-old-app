import type { Maybe, Payload } from './defaults';
import type { ContentService } from './ContentService';

/** A movie in coming */
export interface InComingMoviesList extends Payload<'InComingMoviesList'> {
  /** The movies in coming */
  movies: Maybe<Array<Maybe<ContentService>>>;
}
