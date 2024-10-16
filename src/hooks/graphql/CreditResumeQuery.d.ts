import type { UseQuery, UseLazyQuery } from './Defaults';
import type {
  CreditResumeQuery,
  CreditResumeQueryVariables,
} from '../../@types/graphql/operations';

export type UseCreditResumeQuery = UseQuery<
CreditResumeQuery,
CreditResumeQueryVariables
>;

export type UseCreditResumeLazyQuery = UseLazyQuery<
CreditResumeQuery,
CreditResumeQueryVariables
>;
