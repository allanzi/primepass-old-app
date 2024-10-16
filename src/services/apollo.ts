/* eslint-disable no-underscore-dangle */
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { DATA_MAPPING_HOST } from '@env';

const httpLink = createHttpLink({
  uri: DATA_MAPPING_HOST,
});

const localeMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'user-locale': 'pt_BR',
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(localeMiddleware, httpLink),
  cache: new InMemoryCache({
    dataIdFromObject(responseObject) {
      return `${responseObject.__typename}:${Math.floor(
        Math.random() * 9999999,
      )}`;
    },
  }),
});

export default client;
