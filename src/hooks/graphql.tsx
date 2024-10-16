import React from 'react';
import { ApolloProvider, useApolloClient } from '@apollo/client';

import clientApollo from '../services/apollo';

const GraphQlProvider: React.FC = ({ children }) => (
  <ApolloProvider client={clientApollo}>
    {children}
  </ApolloProvider>
);

function useGraphQl() {
  const context = useApolloClient();

  if (!context) {
    throw new Error('useAuth should be used with an AuthProvider');
  }

  return context;
}

export { useGraphQl, GraphQlProvider };
