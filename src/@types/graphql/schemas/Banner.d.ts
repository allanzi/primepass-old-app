import type { Maybe, Payload } from './defaults';

/** An Banner */
export interface Banner extends Payload<'Banner'> {
  /** The unique id of a Banner */
  id: Maybe<string>;
  /** Image link of Banner */
  image: Maybe<string>;
  /** Link with Banner URL */
  link: Maybe<string>;
  /** The type of the link  */
  type: Maybe<string>;
  /** Banner start date */
  start: Maybe<string>;
  /** Banner expiration date */
  finish: Maybe<string>;
}

/** A query to return list of Banners */
export interface BannersList extends Payload<'BannersList'> {
  /** Banner details */
  banners: Maybe<Array<Maybe<Banner>>>;
  /** Total of Banner fetched */
  total_pages: Maybe<number>;
}
