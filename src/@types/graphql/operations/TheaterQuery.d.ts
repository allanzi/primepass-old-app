import * as Types from '../schemas';

export type TheaterQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TheaterQuery = { __typename?: 'Query' } & {
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
        'name' | 'title' | 'icon' | 'color'
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
  premieres_list?: Types.Maybe<
  { __typename?: 'PremieresList' } & {
    movies?: Types.Maybe<
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
        'name' | 'title' | 'icon' | 'color'
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
        'name' | 'title' | 'icon' | 'color'
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
  in_coming_movies?: Types.Maybe<
  { __typename?: 'InComingMoviesList' } & {
    movies?: Types.Maybe<
    Array<
    Types.Maybe<
    { __typename?: 'ContentService' } & Pick<
    Types.ContentService,
    | 'id'
    | 'description'
    | 'name'
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
        'name' | 'title' | 'icon' | 'color'
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
