import {
  Footer as FooterInterface,
} from '../../../../components/Dialog';

export type { ServiceResume } from '../../../../@types/graphql/schemas';

export interface Background {
  desktop: string;
  mobile: string;
  email: string;
}

export interface Campaign {
  id: string;
  name: string;
}

export interface Description {
  text_button: string;
  link: string;
  label_link: string;
  steps: string[];
  share_data?: Boolean
}

export interface ErrorFormat {
  code: string;
  details: string | null;
  message: string;
}

export interface Image {
  logo: string;
  card_web: string;
  background: Background;
  selected_image: string;
}

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  error?: boolean;
  children?: any;
  footer?: FooterInterface[] | null;
}

export interface Params {
  id: string;
  code: string;
  user?: any;
  voucher: Voucher;
  partner_subscription: Boolean
}

export interface ResponseError {
  data: ErrorFormat;
}

export interface ServerError {
  response: {
    data: ResponseError;
    status: number;
  };
}

export interface Service {
  id: string;
  name: string;
  logo: string;
  image: Image;
  description: Description;
  color: string;
  type: Type;
}

export interface Type {
  name: string;
  title: string;
  icon: string;
  color: string;
}

export interface UserChoiches {
  needChoice: boolean;
  choiceCount: number;
}

export interface Voucher {
  id: string;
  combo: boolean;
  select_up: number;
  expiration: string;
  duration: number;
  amount: number;
  active: boolean;
  total_vouchers: number;
  campaign: Campaign;
  user_choiches: UserChoiches;
  services: Service[];
}
