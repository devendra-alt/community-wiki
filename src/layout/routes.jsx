import { Suspense, lazy } from 'react';

const TempleComponent = lazy(() => import('../source/home/temple'));
const CommunityComponent = lazy(() => import('../source/home/community'));
const UserComponent = lazy(() => import('../source/home/user'));
const ShopsComponent = lazy(() => import('../source/home/shop'));
const PublicBusinessCardComponent = lazy(() =>
  import('../source/home/business/public/publicBusinessCard')
);
const CollectionComponent = lazy(() => import('../source/home/collection'));
import { Navigate } from 'react-router-dom';
import Loading from '../assets/spin';

const LazySuspense = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
const publicRoutes = [
  {
    path: '/',
    exact: true,
    element: <LazySuspense children={<Navigate to={'/temple'} />} />,
  },
  {
    path: '/temple',
    exact: true,
    element: <LazySuspense children={<TempleComponent />} />,
  },
  {
    path: '/shops',
    exact: true,
    element: <LazySuspense children={<ShopsComponent />} />,
  },
  {
    path: '/community',
    exact: true,
    element: <LazySuspense children={<CommunityComponent />} />,
  },
  {
    path: '/shops/shop/:shopId',
    exact: true,
    element: <LazySuspense children={<PublicBusinessCardComponent />} />,
  },
  {
    path: '/user-details/:id',
    exact: true,
    element: <LazySuspense children={<UserComponent />} />,
  },
];

const adminRoutes = [
  {
    path: '/collection',
    exact: true,
    element: <LazySuspense children={<CollectionComponent />} />,
  },
];
