import type { UseQuery, UseLazyQuery } from './Defaults.d';
import type {
  PartnerLoginQuery,
  PartnerLoginQueryVariables,
} from '../../@types/graphql/operations';

export type UsePartnerLoginQuery = UseQuery<
PartnerLoginQuery,
PartnerLoginQueryVariables
>;

export type UsePartnerLoginLazyQuery = UseLazyQuery<
PartnerLoginQuery,
PartnerLoginQueryVariables
>;
