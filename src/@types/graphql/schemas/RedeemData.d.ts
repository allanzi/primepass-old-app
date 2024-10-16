import type { Payload, Maybe } from './defaults';

/** Service Redeem Data */
export interface RedeemData extends Payload<'RedeemData'> {
  /** Indicates if service is redeemed */
  redeemed: Maybe<boolean>;
  /** Voucher Code redeemed */
  voucherCode: Maybe<string>;
  /** Service code redeemed */
  code: Maybe<string>;
  /** User name to login into service */
  userName: Maybe<string>;
  /** Password to login into service */
  password: Maybe<string>;
  /** Indicates if service login uses Primepass User and Password */
  primeLogin: Maybe<boolean>;
  link: string | null;
}
