import { Address, Cinema, Movie } from '../../@types/graphql/schemas';
import { LogEventParam } from '../../hooks/actions';
import { User } from '../../hooks/auth';

export interface TheaterMoviesCardProps {
  id: string;
  name: string;
  shopping: string;
  cinema: Cinema;
  distance?: number;
  theaterUrl: string;
  favorite: boolean;
  address: Address;
  movies: Array<Movie>;
  classifications?: Array<Classification>;
  handleNavigateTheaterMap: Function;
  handleNavigateTransactionTickets: Function;
  user: User;
  logEvent(event: LogEventParam): void
}

export interface Attribute {
  attribute_type_id: string;
  value: string;
}

export interface Classification {
  id: string;
  classification: string;
}
