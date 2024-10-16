import type { Media } from './Media';
import type { ServiceResume } from './ServiceResume';
import type { Producer } from './Producer';
import type { Payload, Maybe } from './defaults';

/** An specific Service Content */
export interface ContentService extends Payload<'ContentService'> {
  /** The unique id of Movie */
  id: Maybe<string>;
  /** The Service Content name */
  name: Maybe<string>;
  /** The Service Content description */
  description: Maybe<string>;
  /** Category list */
  categories: Maybe<Array<Maybe<string>>>;
  /** Director list */
  directors: Maybe<Array<Maybe<string>>>;
  /** Actor list */
  actors: Maybe<Array<Maybe<string>>>;
  /** Content producer */
  producer: Maybe<Producer>;
  /** Content artist */
  artist: Maybe<string>;
  /** The Service Content duration */
  duration: Maybe<number>;
  /** Recommended age */
  recommendedAge: Maybe<string>;
  /** The Service Content launch date */
  launchDate: Maybe<string>;
  /** Defines that the Service Content is detached */
  detach: Maybe<boolean>;
  /** Defines that the Service Content is activated */
  active: Maybe<boolean>;
  /** Service Content media list */
  medias: Maybe<Array<Maybe<Media>>>;
  /** A service resume */
  services: Maybe<Array<Maybe<ServiceResume>>>;
  /** Parent Content Service ID */
  contentServiceId: Maybe<string>;
}

/** A query to return service list, with the content list to each service */
export type ServiceList = {
  __typename?: 'ServiceList';
  /** Service content list */
  service: Maybe<Array<Maybe<ServiceContent>>>;
  /** The quantity of detaches per page */
  per_page: Maybe<number>;
  /** The detach page */
  page: Maybe<number>;
};

/** A service content list */
export type ServiceContent = {
  __typename?: 'ServiceContent';
  /** Service name */
  name: Maybe<string>;
  /** Service content list */
  catalog: Maybe<Array<Maybe<ContentService>>>;
};

/** A service list */
export interface Service extends Payload<'Service'> {
  /** Service name */
  name: string;
  id: string;
  logo: string;
  highlightImage: string;
  url: string;
  color: string;
  userSigned: boolean;
}

/** A query to return Streamings Releases List */
export interface ServicesReleasesList extends Payload<'ServicesReleasesList'> {
  /** Content Service list */
  releases: Maybe<Array<Maybe<ContentService>>>;
  /** The quantity of detaches per page */
  per_page: Maybe<number>;
  /** The detach page */
  page: Maybe<number>;
}

/** A query to return featured content list */
export interface DetachList extends Payload<'DetachList'> {
  /** Detach Content */
  detach: Maybe<Array<Maybe<ContentService>>>;
  /** The quantity of detaches per page */
  per_page: Maybe<number>;
  /** The detach page */
  page: Maybe<number>;
}

/** List content details */
export interface ContentDetail extends Payload<'ContentDetail'> {
  /** Content details */
  details: Maybe<ContentService>;
}

/** List related content details */
export interface RelatedContent extends Payload<'RelatedContent'> {
  /** Related content details */
  related: Maybe<Array<Maybe<ContentService>>>;
}
