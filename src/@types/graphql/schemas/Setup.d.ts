import type { Payload, Maybe } from './defaults';

export interface Setup extends Payload<'Setup'> {
  id: Maybe<string>;
  page: Maybe<string>;
  url: Maybe<string>;
  image: Maybe<string>;
  description: Maybe<string>;
  category: Maybe<SetupCategory>;
  active: Maybe<boolean>;
  tag: SetupTag;
}

export interface SetupCategory extends Payload<'SetupCategory'> {
  id: Maybe<string>;
  name: Maybe<string>;
}

export interface SetupTag extends Payload<'SetupTag'> {
  platform: Platform;
  device: Device;
}

export interface Platform extends Payload<'Platform'> {
  site: boolean;
  app: boolean;
}

export interface Device extends Payload<'Device'> {
  ios: boolean;
  android: boolean;
}

export interface SetupList extends Payload<'SetupList'> {
  setups: Maybe<Array<Maybe<Setup>>>;
  per_page: Maybe<number>;
  page: Maybe<number>;
}
