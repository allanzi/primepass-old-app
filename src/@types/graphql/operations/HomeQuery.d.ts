import * as Types from '../schemas';

export type HomeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type HomeQuery = { __typename?: 'Query' } & {
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
  custom_content?: Types.Maybe<
  { __typename?: 'CustomContentList' } & {
    content?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'CustomContent' } & Pick<
    Types.CustomContent,
    | 'id'
    | 'title'
    | 'subtitle'
    | 'description'
    | 'startDate'
    | 'finishDate'
    | 'priority'
    | 'imageFormat'
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
          | 'id'
          | 'name'
          | 'title'
          | 'icon'
          | 'color'
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
  movies_list?: Types.Maybe<
  { __typename?: 'MoviesList' } & {
    movies?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'Movie' } & Pick<
    Types.Movie,
    | 'id'
    | 'name'
    | 'description'
    | 'categories'
    | 'directors'
    | 'actors'
    | 'artist'
    | 'duration'
    | 'recommendedAge'
    | 'launchDate'
    | 'detach'
    | 'status'
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
  service_type_content?: Types.Maybe<
  { __typename?: 'ServiceTypeContent' } & {
    service_types?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'ServiceTypeCatalog' } & Pick<
    Types.ServiceTypeCatalog,
    'id' | 'name' | 'title' | 'color'
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
          | 'id'
          | 'name'
          | 'title'
          | 'icon'
          | 'color'
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
