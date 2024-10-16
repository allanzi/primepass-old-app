export type { ServiceResume } from '../../../../@types/graphql/schemas';

export interface Redeem {
  redeemed: boolean;
  code: string | null;
  userName: string | null;
  password: string | null;
  primeLogin: string | null;
}

export interface Type {
  name: string;
  color: string;
}

export interface Params {
  id: string;
  redeem: Redeem;
  deepLink: string;
  name: string;
  dateFinish: string;
  from: string;
  type: Type;
  signatureId: string;
  serviceId: string;
}
