import type { Maybe, Payload } from './defaults';
import type { ContentService } from './ContentService';

/** Returns Service Type category list */
export interface ServiceTypeCategories extends Payload<'ServiceTypeCategories'> {
  /** Category list */
  categories: Maybe<Array<Maybe<string>>>;
}

/** A Content List of all Services in a Service Type */
export interface ServiceTypeContent extends Payload<'ServiceTypeContent'> {
  /** Service type content details */
  service_types: Maybe<Array<Maybe<ServiceTypeCatalog>>>;
}

/** Service type content catalog */
export interface ServiceTypeCatalog extends Payload<'ServiceTypeCatalog'> {
  /** Service type ID */
  id: Maybe<string>;
  /** Service type name */
  name: Maybe<string>;
  /** Service type title */
  title: Maybe<string>;
  /** Color to render Service Type */
  color: Maybe<string>;
  /** Service Type priority */
  priority: Maybe<number>;
  /** Service type content catalog */
  catalog: Maybe<Array<Maybe<ContentService>>>;
}

/** Content Service Type */
export interface ServiceType extends Payload<'ServiceType'> {
  /** The unique id of Service Type */
  id: Maybe<string>;
  /** Content Type name */
  name: Maybe<string>;
  /** Content Type title */
  title: string;
  /** Color to render Service Type */
  color: string;
  /** Service Type priority */
  priority: Maybe<number>;
  /** Indicates if Service Type is active or not */
  isActive: Maybe<boolean>;
  activeHistoryMenu: Maybe<boolean>;
  urls: Maybe<URL>;
  icon: Maybe<ServiceTypeIcon>;
}

export interface ServiceTypeIcon {
  white: Maybe<string>;
  gray: Maybe<string>;
}

export interface URL {
  history: {
    route: Maybe<string>;
    analystics: Maybe<string>;
    params: {
      from: Maybe<string>;
    };
  };
  menu: {
    route: Maybe<string>;
    analystics: Maybe<string>;
    params: {
      screen: Maybe<string>;
    };
  };
}
