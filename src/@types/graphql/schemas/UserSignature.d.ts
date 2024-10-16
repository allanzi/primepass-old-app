import type { Maybe, Payload } from './defaults';
import type { ServiceResume } from './ServiceResume';

/** User signature */
export interface UserSignature extends Payload<'UserSignature'> {
  /** The unique id of Content Service */
  id: Maybe<string>;
  /** Signature start */
  dateStart: Maybe<string>;
  /** Signature finish */
  dateFinish: Maybe<string>;
  /** Signature cancel */
  dateCancel: Maybe<string>;
  /** Cancel reason */
  cancelReason: Maybe<string>;
  /** Defines if signature is active */
  isActive: Maybe<boolean>;
  /** The Service Content duration */
  duration: Maybe<number>;
  /** Defines if signature is B2C */
  isB2C: Maybe<boolean>;
  /** Plans in this signature */
  plans: Maybe<Array<Maybe<UserSignaturePlan>>>;
  /** Additional Services in this signature */
  additionalServices: Maybe<Array<Maybe<ServiceResume>>>;
  /** List of all signature services */
  services: Maybe<Array<Maybe<ServiceResume>>>;
  parentSignature: UserSignature
}

/** User signature plan */
export interface UserSignaturePlan extends Payload<'UserSignaturePlan'> {
  /** Plan ID */
  id: Maybe<string>;
  /** Plan name */
  name: Maybe<string>;
  /** Plan description */
  description: Maybe<string>;
  /** Indicate if this plan is a Core Plan */
  isCore: Maybe<boolean>;
  /** List of services in the Plan */
  services: Maybe<Array<Maybe<ServiceResume>>>;
  /** A credit quantity in then plan */
  creditQuantity: Maybe<number>;
  /** Plan HEX Color code */
  color: Maybe<string>;
  duration: number;
}
