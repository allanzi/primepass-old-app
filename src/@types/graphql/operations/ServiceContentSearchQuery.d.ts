import * as Types from '../schemas';

export type ServiceContentSearchQueryVariables = Types.Exact<{
  search: string;
}>;

export type ServiceContentSearchQuery = { __typename?: 'Query' } & {
  service_content_search?: Types.Maybe<
  { __typename?: 'ServiceContentSearch' } & {
    details?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'ContentService' } & Pick<
    Types.ContentService,
    | 'id'
    | 'name'
    | 'description'
    | 'categories'
    | 'duration'
    | 'actors'
    | 'directors'
    | 'recommendedAge'
    | 'launchDate'
    > & {
      producer?: Types.Maybe<
      { __typename?: 'Producer' } & Pick<
      Types.Producer,
      'name' | 'logo'
      >
      >;
      medias?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'Media' } & Pick<
      Types.Media,
      'typeUrl' | 'url'
      >
      >
      >
      >;
      services?: Types.Maybe<
      Array<
      Types.Maybe<
      { __typename?: 'ServiceResume' } & Pick<
      Types.ServiceResume,
      'id' | 'name' | 'logo' | 'color'
      > & {
        type?: Types.Maybe<
        { __typename?: 'ServiceType' } & Pick<
        Types.ServiceType,
        'id' | 'name' | 'title' | 'icon'
        >
        >;
      }
      >
      >
      >;
    }
    >
    >
    >;
  }
  >;
};
