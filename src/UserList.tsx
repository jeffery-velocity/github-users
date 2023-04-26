import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const GET_USERS_QUERY = gql`
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

interface User {
  id: string;
  name: string | null;
  login: string;
  avatarUrl: string;
}

interface SearchData {
  search: {
    nodes: User[];
  };
}
const UserList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [getUsers, { loading, error, data }] = useLazyQuery<SearchData>(GET_USERS_QUERY);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getUsers({ variables: { searchQuery } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.search.nodes.map(user => (
            <li key={user.id}>
              <img src={user.avatarUrl} alt={`${user.login}'s avatar`} />
              <div>
                <p>{user.name || user.login}</p>
                <p>{user.login}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
