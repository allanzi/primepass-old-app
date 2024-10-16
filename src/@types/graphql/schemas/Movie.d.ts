import type { Payload } from './defaults';
import type { Media } from './Media';

/** An specific Movie */
export interface Movie extends Payload<'Movie'> {
  id: string;
  name: string;
  categories: Array<string>;
  status: string;
  rooms: Array<string>;
  screens: Array<string>;
  audios: Array<string>;
  medias: Array<Media>;
  classification: string;
}

/** A query to return list of Movies */
export interface MoviesList extends Payload<'MoviesList'> {
  /** Movie details */
  movies: Array<Movie>;
  /** The quantity of movies per page */
  per_page: number;
  /** The movie page */
  page: number;
}

/** A query to return list of Movies */
export interface MoviesRelated extends Payload<'MoviesRelated'> {
  /** Movie details */
  movies: Array<Movie>;
}
