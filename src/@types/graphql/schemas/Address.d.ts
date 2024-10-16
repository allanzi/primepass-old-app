import type { Maybe, Payload } from './defaults';

/** An Address */
export interface Address extends Payload<'Address'> {
  /** The unique id of Address */
  id: string;
  /** The name of Address */
  name: string;
  /** The number of Address */
  number: string;
  /** The district of Address */
  district: Maybe<string>;
  /** The zip code of Address */
  zipCode: Maybe<string>;
  /** The latitude of Address */
  latitude: number;
  /** The distance from user location */
  distance: number;
  /** The longitude of Address */
  longitude: number;
  /** A City related with a Address */
  city: Maybe<City>;
}

/** An City */
export interface City extends Payload<'City'> {
  /** The unique id of a City */
  id: Maybe<string>;
  /** A city related with a state */
  state: Maybe<string>;
  /** The name of City */
  name: Maybe<string>;
}
