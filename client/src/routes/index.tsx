import React, { lazy } from 'react';
import { LayoutContainer } from 'components/Layout/Layout';
import { Redirect } from 'react-router-dom';

const RegistrationPage = lazy(() => import('components/_pages/RegistrationPage').then(
  (module) => ({ default: module.RegistrationPage }),
));
const LoginPage = lazy(() => import('components/_pages/LoginPage').then(
  (module) => ({ default: module.LoginPage }),
));
const ProfilePage = lazy(() => import('components/_pages/ProfilePage').then(
  (module) => ({ default: module.ProfilePage }),
));
const UsersPage = lazy(() => import('components/_pages/UsersPage').then(
  (module) => ({ default: module.UsersPage }),
));
const DialogsPage = lazy(() => import('components/_pages/DialogsPage').then(
  (module) => ({ default: module.DialogsPage }),
));
const PostPage = lazy(() => import('components/_pages/PostPage').then(
  (module) => ({ default: module.PostPage }),
));
const FeedPage = lazy(() => import('components/_pages/FeedPage').then(
  (module) => ({ default: module.FeedPage }),
));

export type RouteType = {
  path: string
  component: React.ComponentType
  exact?: boolean
}

export enum Routes {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FEED = '/feed',
  POST = '/post/:id',
  USERS = '/users/:filter?',
  PROFILE = '/profile/:username?',
  DIALOGS = '/dialogs/:username?'
}

export const publicRoutes: RouteType[] = [
  {
    path: Routes.POST,
    component: () => <LayoutContainer sidebar><PostPage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.PROFILE,
    component: () => <LayoutContainer sidebar><ProfilePage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.USERS,
    component: () => <LayoutContainer sidebar><UsersPage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.LOGIN,
    component: () => <LayoutContainer background><LoginPage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.REGISTER,
    component: () => <LayoutContainer background><RegistrationPage /></LayoutContainer>,
    exact: false,
  },
  { path: Routes.HOME, component: () => <Redirect to="/login" />, exact: false },
];

export const privateRoutes: RouteType[] = [
  {
    path: Routes.FEED,
    component: () => <LayoutContainer sidebar><FeedPage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.DIALOGS,
    component: () => <LayoutContainer sidebar><DialogsPage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.POST,
    component: () => <LayoutContainer sidebar><PostPage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.PROFILE,
    component: () => <LayoutContainer sidebar><ProfilePage /></LayoutContainer>,
    exact: false,
  },
  {
    path: Routes.USERS,
    component: () => <LayoutContainer sidebar><UsersPage /></LayoutContainer>,
    exact: false,
  },
  { path: Routes.HOME, component: () => <Redirect to="/feed" />, exact: false },
];
