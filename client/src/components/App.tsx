import React, {useEffect, Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {StateType} from 'redux/store'
import {deinitializeApp, initializeApp} from 'redux/reducers/app.reducer'
import Layout from 'components/Layout/Layout'
import Spinner from "components/_shared/Spinner/Spinner";
import HomePage from 'components/_pages/HomePage'
import {AuthCard} from 'components/AuthCard/AuthCard'

const RegistrationPage = lazy(() => import('components/_pages/RegistrationPage'))
const LoginPage = lazy(() => import('components/_pages/LoginPage'))
const ProfilePage = lazy(() => import('components/_pages/ProfilePage'))
const UsersPage = lazy(() => import('components/_pages/UsersPage'))
const DialogsPage = lazy(() => import('components/_pages/DialogsPage'))
const PostPage = lazy(() => import('components/_pages/PostPage'))
const FeedPage = lazy(() => import('components/_pages/FeedPage'))

const TestPage = lazy(() => import('components/TestPage/TestPage'))
const FormTestPage = lazy(() => import('components/TestPage/FormTestPage'))


const App: React.FC = () => {
    return (
        <Suspense fallback={<AppSpinner/>}>
            <Switch>
                {/*Pages*/}
                <Route path="/feed" render={() => <Layout sidebar={true}><FeedPage/></Layout>}/>
                <Route path="/post/:id" render={() => <Layout sidebar={true}><PostPage/></Layout>}/>
                <Route exact path="/profile/:username?" render={() => <Layout sidebar={true}><ProfilePage/></Layout>}/>
                <Route path="/dialogs/:username?" render={() => <Layout sidebar={true}><DialogsPage/></Layout>}/>
                <Route path="/users/:filter?" render={() => <Layout sidebar={true}><UsersPage/></Layout>}/>

                {/*Pages under construction*/}
                <Route path="/settings" render={() => <Layout sidebar={true}>Settings Page</Layout>}/>

                {/*Component testing playgrounds (delete on prod)*/}
                <Route path={'/testpage'} component={TestPage}/>
                <Route path={'/formtestpage'} component={FormTestPage}/>

                <Route path="/login" render={() => <Layout background={true}><LoginPage/></Layout>}/>
                <Route path="/register" render={() => <Layout background={true}><RegistrationPage/></Layout>}/>
                <Route exact path="/" component={HomePage}/>

                <Route render={() => <div>404 Error: No such page</div>}/>
            </Switch>
        </Suspense>
    )
}

// Container
const AppContainer: React.FC = () => {
    const dispatch = useDispatch()
    const initialized = useSelector((state: StateType) => state.app.initialized)


    useEffect(() => {
        dispatch(initializeApp())
        return () => { dispatch(deinitializeApp()) }
    }, [dispatch])

    if (!initialized) return <Spinner size={100} thickness={4} fullscreen={true}/>

    return (
        <App/>
    )
}

const AppSpinner = () => <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Spinner size={100} thickness={4}/>
</div>

export default AppContainer
