import type { Payload, Maybe } from './defaults';

export interface Period {
  [x: string]: string[];
  startDate: Maybe<string>;
  finishDate: Maybe<string>;
  availableCredits: Maybe<number>;
  usedCredits: Maybe<number>;
  totalCredits: Maybe<number>;
  fromPlan: Maybe<boolean>;
  day: Array<string>;
  screen: Array<string>;
  room: Array<string>;
}

export interface CreditResume extends Payload<'UserCreditResume'> {
  creditTypeId: Maybe<string>;
  creditTypeName: Maybe<string>;
  day: Maybe<Array<string>>;
  room: Maybe<Array<string>>;
  screen: Maybe<Array<string>>;
  periods: Period[];
}
