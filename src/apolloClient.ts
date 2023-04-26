import { ApolloClient, InMemoryCache } from '@apollo/client';

const GITHUB_API_URL = 'https://api.github.com/graphql';

const client = new ApolloClient({
  uri: GITHUB_API_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});

export default client;