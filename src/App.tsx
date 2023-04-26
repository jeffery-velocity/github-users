import React from 'react';
import { ApolloProvider } from '@apollo/client';
import UserList from './UserList';
import client from './apolloClient';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <UserList />
    </ApolloProvider>
  );
};

export default App;
