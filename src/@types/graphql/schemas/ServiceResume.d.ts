import { RedeemData } from './RedeemData';
import { ServiceType } from './ServiceType';
import type { Payload, Maybe } from './defaults';
import type { Rules } from './Rules';

interface Images extends Payload<'ServiceImages'> {
  card_web: string;
  history_image: string;
  logo: string;
  rescue_image: string;
  selected_image: string;
}

/** A Service resume */
export interface ServiceResume extends Payload<'ServiceResume'> {
  /** Service UUID */
  id: string;
  /** Service name */
  name: Maybe<string>;
  /** Service logo */
  logo: Maybe<string>;
  acceptedShareData: boolean;
  images: Images
  /** Service Type */
  type: ServiceType;
  /** Color to render service */
  color: Maybe<string>;
  /** Service deep link to content */
  deepLink: Maybe<string>;
  /** Redeem data for service */
  redeem: RedeemData;
  /** Rules */
  rules: Maybe<Rules>;
  description: ServiceDescription;
  dateFinish: string;
}

export interface ServiceDescription extends Payload<'ServiceDescription'> {
  text_button: string;
  link: string;
  label_link: string;
  steps: string[];
  description: string;
  share_data: boolean;
}
