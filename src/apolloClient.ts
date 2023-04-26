import { ApolloClient, InMemoryCache } from '@apollo/client';

const GITHUB_API_URL = 'https://api.github.com/graphql';
const GITHUB_PERSONAL_ACCESS_TOKEN = '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'; // Replace with your own token

const client = new ApolloClient({
  uri: GITHUB_API_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

export default client;