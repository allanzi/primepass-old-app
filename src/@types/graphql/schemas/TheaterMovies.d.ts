import type { Payload } from './defaults';
import type { Address } from './Address';
import type { Movie } from './Movie';

export interface TheaterMovies extends Payload<'TheaterMovie'> {
  id: string;
  name: string;
  cinema: Cinema;
  distance: number;
  address: Address;
  theaterUrl: string;
  movies: Array<Movie>;
}

export interface Cinema {
  id: string;
  name: string;
}

export interface TheaterMoviesList extends Payload<'TheatersMoviesList'> {
  total_pages: number;
  page: number;
  per_page: number;
  theaters: Array<TheaterMovies>;
}
