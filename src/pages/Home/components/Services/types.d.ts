export interface Signature {
  id: string;
  cancelReason: string;
  dateCancel: string;
  dateFinish: Date;
  dateStart: Date;
  duration: number;
  isActive: boolean;
  services: Service[];
}

export interface Service {
  id: string;
  signatureId: string;
  dateStart: string;
  dateFinish: string;
  name: string;
  images: Image;
  logo: string;
  redeem: Redeem;
  type: Type;
  description: Description;
}

export interface Description {
  description: string;
  link: string;
  share_data: boolean;
  label_link: string;
  steps: Array<string>;
}

export interface Image {
  card_web: string;
  rescue_image: string;
}

export interface Redeem {
  redeemed: string;
  link: string;
  password: string;
  code: string;
  userName: string;
  activationAccountNumber: string;
}

export interface Type {
  name: string;
  title: string;
}
