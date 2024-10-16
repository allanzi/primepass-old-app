import type {
  QueryHookOptions,
  LazyQueryHookOptions,
  QueryResult,
  QueryTuple,
} from '@apollo/client';

export type Options<Q, V> = QueryHookOptions<Q, V>;

export type OptionsLazy<Q, V> = LazyQueryHookOptions<Q, V>;

/**
 * When React mounts and renders a component that calls the useQuery hook,
 * Apollo Client automatically executes the specified query.
 */
export type UseQuery<Q, V> = (options?: Options<Q, V>) => QueryResult<Q, V>;
/**
 * This hook acts just like useQuery, with one key exception: when useLazyQuery is called,
 * it does not immediately execute its associated query. Instead, it returns a function in
 * its result tuple that you can call whenever you're ready to execute the query.
 */
export type UseLazyQuery<Q, V> = (
  options?: OptionsLazy<Q, V>,
) => QueryTuple<Q, V>;
