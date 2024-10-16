import * as Types from '../schemas';

export type OtherOptionsQueryVariables = Types.Exact<{
  serviceTypeId: string;
}>;

export type OtherOptionsQuery = { __typename?: 'Query' } & {
  service_type_content?: Types.Maybe<
  { __typename?: 'ServiceTypeContent' } & {
    service_types?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'ServiceTypeCatalog' } & Pick<
    Types.ServiceTypeCatalog,
    'id' | 'name' | 'title'
    > & {
      catalog?: Types.Maybe<
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
    >
    >
    >;
  }
  >;
};
