import type { AxiosError, AxiosResponse } from 'axios';

export type PartnerType = 'facebook' | 'apple' | 'google' | 'vip' | undefined;

export type CallbackError<T = Error | AxiosError> = (error: T) => void;

export type Link = () => Promise<boolean>;

export type UnlinkParam = Exclude<PartnerType, undefined>;

export type Unlink = (partnerType: UnlinkParam) => Promise<boolean>;

export type AppleAuthenticator = () => Promise<boolean>;

export interface User {
  id: string;
  name: string;
  document: null | string;
  profile_picture: string;
  phone: string;
  email: string;
  password: null;
  address: null | string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerLinkPayload {
  user_id: string;
  partner_type: PartnerType;
  partner_id: string;
  partner_token: string;
}

export type PartnerLinkResponse = AxiosResponse<User>;

export interface PartnerUnlinkPayload {
  user_id: string;
  partner_type: PartnerType;
}

export type PartnerUnlinkResponse = AxiosResponse<{
  data: string;
}>;
