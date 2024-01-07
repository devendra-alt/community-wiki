import React, { useEffect } from 'react';
import ResponsiveAppBar from './source/home/header';
import Content from './layout/content';
import { useQuery } from '@apollo/client';
import GET_USER from './graphql/user/query/getUser';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/feature/authSlice';

export default function App() {
  const id = localStorage.getItem('id');
  const { data } = useQuery(GET_USER, { variables: { id }, skip: !id });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserData(data));
  }, [data]);
  return (
    <>
      <ResponsiveAppBar />
      <Content />
    </>
  );
}
