export interface Payload<Typename> {
  __typename?: Typename;
}

export type Maybe<T> = T | null;

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
