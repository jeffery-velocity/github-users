import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOS } from './graphql';

interface Repository {
  id: string;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
}

interface SearchData {
  search: {
    nodes: Repository[];
  };
}

const RepositoryList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [getRepositories, { loading, error, data }] = useLazyQuery<SearchData>(GET_REPOS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getRepositories({ variables: { searchQuery } });
  };

  const repos = data ? data.search.nodes : [];

  return (
    <div className='p-8'>
      <form onSubmit={handleSubmit}>
        <h4 className='mb-4'>Search Repositories</h4>
        <input type="text" className='border border-black p-2' value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {repos.filter(e => !!e.name).map(repo => (
          <li key={repo.id} className='p-2 border-b'>
            <div>
              <a href={`https://github.com/${repo.owner.login}/${repo.name}`} className='text-blue-500'>{repo.name}</a>
              <p>{repo.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
