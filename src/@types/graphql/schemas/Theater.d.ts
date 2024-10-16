import type { Payload, Maybe } from './defaults';
import type { Address } from './Address';
import type { Movie } from './Movie';
import type { Session } from './Session';

/** An Theater */
export interface Theater extends Payload<'Theater'> {
  /** The unique id of Theater */
  id: Maybe<string>;
  /** The name of Theater */
  name: Maybe<string>;
  /** Indicates if Theater is active or not */
  isActive: Maybe<boolean>;
  /** The Address related of Theater */
  address: Maybe<Address>;
  /** A list of Session related with a Theater */
  sessions: Maybe<Array<Maybe<Session>>>;
  /** Movie details */
  movies: Maybe<Array<Maybe<Movie>>>;
  /** Movie details */
  favoriteTheater: Maybe<Array<Maybe<FavoriteTheater>>>;
  /** Movie details */
  cinemaId: Maybe<string>;
  /** isFavorite */
  isFavorite: Maybe<boolean>;
  /** seat */
  seat: Maybe<boolean>;
  /** theaterUrl */
  theaterUrl: Maybe<string>;
  distance: Maybe<number>;
}

/** An Favorite Theater */
export interface FavoriteTheater extends Payload<'FavoriteTheater'> {
  /** The unique id of a FavoriteTheater */
  id: Maybe<string>;
  /** The name of a TheaterInfo */
  name: Maybe<string>;
  /** Indicates if Theater is favorite or not */
  isFavorite: Maybe<boolean>;
}

/** A list of Theaters and his movies */
export interface TheatersMoviesList extends Payload<'TheatersMoviesList'> {
  /** The quantity of pages */
  total_pages: Maybe<number>;
  /** The current page */
  page: Maybe<number>;
  /** The quantity of theater per page */
  per_page: Maybe<number>;
  /** The Theaters and his movies */
  theaters: Maybe<Array<Maybe<Theater>>>;
}
