import React, {lazy} from 'react'
import Layout from 'components/Layout/Layout'
import {Redirect} from 'react-router-dom'

const RegistrationPage = lazy(() => import('components/_pages/RegistrationPage'))
const LoginPage = lazy(() => import('components/_pages/LoginPage'))
const ProfilePage = lazy(() => import('components/_pages/ProfilePage'))
const UsersPage = lazy(() => import('components/_pages/UsersPage'))
const DialogsPage = lazy(() => import('components/_pages/DialogsPage'))
const PostPage = lazy(() => import('components/_pages/PostPage'))
const FeedPage = lazy(() => import('components/_pages/FeedPage'))

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
    {path: Routes.POST, component: () => <Layout sidebar={true}><PostPage/></Layout>, exact: false},
    {path: Routes.PROFILE, component: () => <Layout sidebar={true}><ProfilePage/></Layout>, exact: false},
    {path: Routes.USERS, component: () => <Layout sidebar={true}><UsersPage/></Layout>, exact: false},
    {path: Routes.LOGIN, component: () => <Layout background={true}><LoginPage/></Layout>, exact: false},
    {path: Routes.REGISTER, component: () => <Layout background={true}><RegistrationPage/></Layout>, exact: false},
    {path: Routes.HOME, component: () => <Redirect to={'/login'}/>, exact: false}
]

export const privateRoutes: RouteType[] = [
    {path: Routes.FEED, component: () => <Layout sidebar={true}><FeedPage/></Layout>, exact: false},
    {path: Routes.DIALOGS, component: () => <Layout sidebar={true}><DialogsPage/></Layout>, exact: false},
    {path: Routes.POST, component: () => <Layout sidebar={true}><PostPage/></Layout>, exact: false},
    {path: Routes.PROFILE, component: () => <Layout sidebar={true}><ProfilePage/></Layout>, exact: false},
    {path: Routes.USERS, component: () => <Layout sidebar={true}><UsersPage/></Layout>, exact: false},
    {path: Routes.HOME, component: () => <Redirect to={'/feed'}/>, exact: false}
]
