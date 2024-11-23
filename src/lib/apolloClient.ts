// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP and Auth Links
const httpLink = new HttpLink({
  uri: 'http://localhost:3005/graphql',
  credentials: 'same-origin',
});

const authLink = setContext(() => {
  if (typeof window === 'undefined') return {};
  const token = sessionStorage.getItem('accessToken'); // Use sessionStorage instead of localStorage
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});


// Singleton Apollo Client
export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined', // Enable SSR
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
