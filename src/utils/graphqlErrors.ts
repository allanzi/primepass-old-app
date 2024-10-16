interface GraphqlError {
  message: string;
}

export const isNetworkConnectionError = (error: GraphqlError) => error?.message === 'Network request failed';

export default isNetworkConnectionError;
