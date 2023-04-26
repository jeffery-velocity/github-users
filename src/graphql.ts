import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query getUsers($searchQuery: String!) {
    search(query: $searchQuery, type: USER, first: 20) {
      nodes {
        ... on User {
          id
          name
          login
          avatarUrl(size: 100)
        }
      }
    }
  }
`;

export const GET_REPOS = gql`
  query getRepos($searchQuery: String!) {
    search(query: $searchQuery, type: REPOSITORY, first: 20) {
      nodes {
        ... on Repository {
          id
          name
          description
          owner {
            login
          }
        }
      }
    }
  }
`;