import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminRoutes, publicRoutes } from './routes';
import Loading from '../assets/spin';
import DefaultRender from '../utils/default';

export default function Content() {
  const { userRole } = useSelector((state) => state.auth);
  const routes =
    userRole === 'ADMIN' ? [...publicRoutes, ...adminRoutes] : publicRoutes;
  return (
    <Routes>
      {routes?.map((route, index) => {
        return (
          <Route
            path={route.path}
            exact={route.exact}
            key={index}
            element={route.element}
          />
        );
      })}
      {routes.length == 0 ? (
        <Route path="*" element={<Loading />} />
      ) : (
        <Route path="*" element={<DefaultRender />} />
      )}
    </Routes>
  );
}
