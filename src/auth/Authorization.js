import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { client } from './client';
import Landing from '../pages/landing';
import App from '../App';
import { useSelector } from 'react-redux';

export default function Authorization() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        {localStorage.getItem('token') || isLoggedIn ? <App /> : <Landing />}
      </ApolloProvider>
    </BrowserRouter>
  );
}
