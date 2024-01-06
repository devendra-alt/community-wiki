import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { client } from './client';
import Landing from '../pages/landing';
import App from '../App';

export default function Authorization() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        {localStorage.getItem('token') ? <App /> : <Landing />}
      </ApolloProvider>
    </BrowserRouter>
  );
}
