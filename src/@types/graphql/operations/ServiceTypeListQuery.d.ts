import * as Types from '../schemas';

export type ServiceTypeListQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ServiceTypeListQuery = { __typename?: 'Query' } & {
  services_type_list: {
    service_types: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'ServiceType' } & Pick<
    Types.ServiceType,
    | 'id'
    | 'activeHistoryMenu'
    | 'color'
    | 'icon'
    | 'isActive'
    | 'name'
    | 'priority'
    | 'title'
    | 'urls'
    >
    >
    >
    >;
  };
};
