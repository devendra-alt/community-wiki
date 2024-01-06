import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Community from '../source/home/community';
import Temple from '../source/home/temple';
import User from '../source/home/user';
import Shops from '../source/home/shop';
import Collection from '../source/home/collection';

export default function Content() {
  return (
    <Routes>
      <Route
        path="/"
        exact={true}
        element={<Navigate to="/community" />}
      ></Route>
      <Route
        path="/community"
        key="/community"
        exact={true}
        element={<Community />}
      />
      <Route path="/temple" exact={true} element={<Temple />} />
      <Route path="/user-details/:id" exact={true} element={<User />} />
      <Route path="/shops" exact={true} element={<Shops />} />
      <Route path="/collection" exact={true} element={<Collection />} />
    </Routes>
  );
}
