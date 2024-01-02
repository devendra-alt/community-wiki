import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Community from '../source/home/community';

export default function Content() {
  return (
    <Routes>
      <Route path="/community" key="/community" exact={true} element={<Community />} />
    </Routes>
  );
}
