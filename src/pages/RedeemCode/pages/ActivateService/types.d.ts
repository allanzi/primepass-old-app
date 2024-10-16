import {
  Footer as FooterInterface,
} from '../../../../components/Dialog';

export interface Description {
  description: string;
  text_button: string;
  link: string;
  label_link: string;
  terms_conditions: string;
  steps: string[];
  share_data: boolean;
}

export interface Image {
  logo: string;
  card_web: string;
  selected_image: string;
  rescue_image: string;
}

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  error?: boolean;
  children?: any;
  footer?: FooterInterface[] | null;
}

export interface Params {
  signatureId: string | undefined;
  serviceId: string;
  description: Description;
  id: string;
  images: Image;
  redeem: Redeem;
  deepLink: string;
  name: string;
  dateFinish: string;
  from: string;
  type: Type;
  acceptedShareData?: boolean;
}

export interface Redeem {
  redeemed: boolean;
  code: string | null;
  userName: string | null;
  password: string | null;
  primeLogin: string | null;
}

export interface Type {
  title: string | undefined;
  name: string;
  color: string;
}
