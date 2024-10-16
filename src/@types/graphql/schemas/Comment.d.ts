import type { Maybe, Payload } from './defaults';
import type { User } from './User';
import type { Movie } from './Movie';

/** Comment from a specific user */
export interface Comment extends Payload<'Comment'> {
  /** The unique id of Comment */
  id: Maybe<string>;
  /** Text of the user message */
  message: Maybe<string>;
  /** If the comment is active */
  status: Maybe<boolean>;
  /** User details and information */
  user: Maybe<User>;
  /** Movie details and information */
  movie: Maybe<Movie>;
}

/** A query to return list of Comment */
export interface CommentsList extends Payload<'CommentsList'> {
  /** Details of the comment and user and movie information */
  comments: Maybe<Array<Maybe<Comment>>>;
  /** Total of Comment fetched */
  total_pages: Maybe<number>;
}
