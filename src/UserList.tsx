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

  const users = data ? data.search.nodes : [];

  return (
    <div className='p-8'>
      <form onSubmit={handleSubmit}>
        <h4 className='mb-4'>Search Github Users</h4>
        <input type="text" className='border border-black p-2' value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {users.filter(e => !!e.login).map(user => (
          <li key={user.id} className='p-2 border-b'>
            <img src={user.avatarUrl} alt={`${user.login}'s avatar`} width={60} />
            <div>
              <p>{user.name || user.login}</p>
              <a href={`https://github.com/${user.login}`} className='text-blue-500'>{user.login}</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
