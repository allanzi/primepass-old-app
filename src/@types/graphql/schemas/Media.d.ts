import type { Payload } from './defaults';

/** An Media */
export interface Media extends Payload<'Media'> {
  id: string;
  url: string;
  typeUrl: string;
}
