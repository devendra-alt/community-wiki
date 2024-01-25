import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  adminMenuItems,
  adminRoutes,
  commonMenuItems,
  publicRoutes,
  superAdminRoutes,
} from './routes';
import Loading from '../assets/spin';
import DefaultRender from '../utils/default';

export default function Content() {
  const { userRole } = useSelector((state) => state.auth);

  let routes = [...publicRoutes];

  switch (userRole) {
    case 'ADMIN':
      routes.push(...adminRoutes);
    case 'SUPER_ADMIN':
      routes.push(...adminRoutes, ...superAdminRoutes);
  }

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
