import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import type {
  UseCreditResumeQuery,
  UseCreditResumeLazyQuery,
} from './CreditResumeQuery.d';

export const CreditResumeDocument = gql`
  query CreditResume($user_id: String!) {
    user_credit_resume_list(user_id: $user_id) {
      creditTypeId
      creditTypeName
      day
      room
      screen
      periods {
        startDate
        finishDate
        availableCredits
        usedCredits
        totalCredits
        fromPlan
      }
    }
  }
`;

export const useCreditResumeQuery: UseCreditResumeQuery = (options) =>
  Apollo.useQuery(CreditResumeDocument, options);

export const useCreditResumeLazyQuery: UseCreditResumeLazyQuery = (options) =>
  Apollo.useLazyQuery(CreditResumeDocument, options);
