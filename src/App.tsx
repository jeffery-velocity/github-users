import React from 'react';
import { ApolloProvider } from '@apollo/client';
import UserList from './UserList';
import client from './apolloClient';
import RepositoryList from './RepositoryList';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className='grid grid-cols-2'>
        <UserList />
        <RepositoryList />
      </div>
    </ApolloProvider>
  );
};

export default App;
