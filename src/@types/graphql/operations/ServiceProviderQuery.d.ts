import * as Types from '../schemas';

export type ServiceProviderQueryVariables = Types.Exact<{
  serviceId: string;
}>;

export type ServiceProviderQuery = { __typename?: 'Query' } & {
  detach_list?: Types.Maybe<
  { __typename?: 'DetachList' } & {
    detach?: Types.Maybe<
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
    | 'artist'
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
        'id' | 'name' | 'title' | 'icon' | 'color'
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
  services_releases_list?: Types.Maybe<
  { __typename?: 'ServicesReleasesList' } & {
    releases?: Types.Maybe<
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
  content_service_highlight?: Types.Maybe<
  { __typename?: 'ContentServiceHighlight' } & {
    content_services?: Types.Maybe<
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
  service_type_categories?: Types.Maybe<
  { __typename?: 'ServiceTypeCategories' } & Pick<
  Types.ServiceTypeCategories,
  'categories'
  >
  >;
};
