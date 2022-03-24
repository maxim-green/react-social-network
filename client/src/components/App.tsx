import React, {useEffect, Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {StateType} from 'redux/store'
import {deinitializeApp, initializeApp} from 'redux/reducers/app.reducer'
import Layout from 'components/Layout/Layout'
import Spinner from "components/_shared/Spinner/Spinner";

// todo refactor two imports below to lazy
import LoginPage from 'components/_pages/LoginPage'
import RegistrationPage from 'components/_pages/RegistrationPage'
const ProfilePage = lazy(() => import('components/_pages/ProfilePage'))
const UsersPage = lazy(() => import('components/_pages/UsersPage'))
const DialogsPage = lazy(() => import('components/_pages/DialogsPage'))
const PostPage = lazy(() => import('components/_pages/PostPage'))
const FeedPage = lazy(() => import('components/_pages/FeedPage'))

const TestPage = lazy(() => import('components/TestPage/TestPage'))
const FormTestPage = lazy(() => import('components/TestPage/FormTestPage'))



type PropsType = {
    authorized: boolean,
    username?: string,
}

const App: React.FC<PropsType> = ({
                                      authorized,
                                      username
                                  }) => {
    return (
        <Suspense fallback={<AppSpinner/>}>
            <Switch>
                {!authorized && <Route path="/login" component={LoginPage}/>}
                {authorized &&
                <Route path="/login" render={() => <Redirect to={`/profile/${username}`}/>}/>}

                {!authorized && <Route path="/register" component={RegistrationPage}/>}
                {authorized &&
                <Route path="/register" render={() => <Redirect to={`/profile/${username}`}/>}/>}

                <Route path="/post/:id" render={() => <Layout sidebar={true}><PostPage/></Layout>}/>
                {authorized && <Route path="/feed" render={() => <Layout sidebar={true}><FeedPage/></Layout>}/>}

                <Route exact path="/profile" render={() => <Redirect to={`/profile/${username}`}/>}/>
                <Route exact path="/profile/:username" render={() => <Layout sidebar={true}><ProfilePage/></Layout>}/>

                <Route path="/users/:filter?" render={() => <Layout sidebar={true}><UsersPage/></Layout>}/>
                <Route path="/dialogs/:username" render={() => <Layout sidebar={true}><DialogsPage/></Layout>}/>
                <Route path="/dialogs/" render={() => <Layout sidebar={true}><DialogsPage/></Layout>}/>
                <Route path="/settings" render={() => <Layout sidebar={true}>Settings Page</Layout>}/>
                <Route path="/photos" render={() => <Layout>Photos Page</Layout>}/>
                <Route path="/music" render={() => <Layout>Music Page</Layout>}/>

                <Route path={'/testpage'} component={TestPage}/>
                <Route path={'/formtestpage'} component={FormTestPage}/>

                {!authorized && <Route path="/" render={() => <Redirect to="/login"/>}/>}
                {authorized && <Route path="/" render={() => <Redirect to={`/feed`}/>}/>}
            </Switch>
        </Suspense>
    )
}

// Container
const AppContainer: React.FC<PropsType> = () => {
    const dispatch = useDispatch()
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    const initialized = useSelector((state: StateType) => state.app.initialized)
    const username = useSelector((state: StateType) => state.auth.user?.username)


    useEffect(() => {
        dispatch(initializeApp())
        return () => {
            dispatch(deinitializeApp())
        }
    }, [dispatch])

    if (!initialized) return <AppSpinner/>

    return (
        <App authorized={authorized} username={username}/>
    )
}

const AppSpinner = () => <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Spinner size={100} thickness={8}/>
</div>

export default AppContainer
