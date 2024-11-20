// src/lib/graphqlClient.ts
import { GraphQLClient } from 'graphql-request';

const graphqlEndpoint = 'http://localhost:4000/graphql';

export const getClient = () => {
  if (typeof window !== 'undefined') {
    // Client-side only
    const token = localStorage.getItem('token');
    return new GraphQLClient(graphqlEndpoint, {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        'Apollo-Require-Preflight': 'true',
      },
    });
  }
  
  return new GraphQLClient(graphqlEndpoint);
};
