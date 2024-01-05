import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Community from '../source/home/community';
import Temple from '../source/home/temple';

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
    </Routes>
  );
}
