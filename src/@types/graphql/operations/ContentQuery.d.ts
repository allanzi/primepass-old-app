import * as Types from '../schemas';

export type ContentQueryVariables = Types.Exact<{
  contentId: string;
}>;

export type ContentQuery = { __typename?: 'Query' } & {
  related_content?: Types.Maybe<
  { __typename?: 'RelatedContent' } & {
    related?: Types.Maybe<
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
};
