import * as Types from '../schemas';

export type CreditResumeQueryVariables = Types.Exact<{
  user_id: string;
}>;

export type CreditResumeQuery = { __typename?: 'Query' } & {
  user_credit_resume_list?: Types.Maybe<
  Array<
  Types.Maybe<
  { __typename?: 'UserCreditResume' } & Pick<
  Types.CreditResume,
  | 'creditTypeId'
  | 'creditTypeName'
  | 'day'
  | 'periods'
  | 'room'
  | 'screen'
  >
  >
  >
  >;
};
