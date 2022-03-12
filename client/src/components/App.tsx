import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LoginPageContainer from 'components/_pages/LoginPage'
import RegistrationPageContainer from 'components/_pages/RegistrationPage'
import {useDispatch, useSelector} from 'react-redux'
import ProfilePage from 'components/_pages/ProfilePage'
import UsersPage from 'components/_pages/UsersPage'
import {deinitializeApp, initializeApp} from 'redux/reducers/app.reducer'
import {StateType} from 'redux/store'
import Layout from 'components/Layout/Layout'
import TestPage from 'components/TestPage/TestPage'
import DialogsPage from "components/_pages/DialogsPage";
import Spinner from "components/_shared/Spinner/Spinner";
import PostPage from 'components/_pages/PostPage'
import FeedPage from 'components/_pages/FeedPage'
import {FormTestPage} from 'components/TestPage/FormTestPage'


// todo: implement separate pages bundling (lazy imports)

type PropsType = {
    authorized: boolean,
    username?: string,
}

const App: React.FC<PropsType> = ({
                                      authorized,
                                      username
                                  }) => {
    return (
        <>
            <Switch>
                {!authorized && <Route path="/login" component={LoginPageContainer}/>}
                {authorized &&
                <Route path="/login" render={() => <Redirect to={`/profile/${username}`}/>}/>}

                {!authorized && <Route path="/register" component={RegistrationPageContainer}/>}
                {authorized &&
                <Route path="/register" render={() => <Redirect to={`/profile/${username}`}/>}/>}

                {!authorized && <Route path="/profile/edit" render={() => <Redirect to="/login"/>}/>}
                <Route exact path="/profile/:username" component={ProfilePage}/>

                <Route path="/post/:id" component={PostPage}/>
                <Route path="/feed" component={FeedPage}/>

                <Route path="/users/:filter?" component={UsersPage}/>
                <Route path="/dialogs/:username" component={DialogsPage}/>
                <Route path="/dialogs/" component={DialogsPage}/>
                <Route path="/photos" render={() => <Layout>Photos Page</Layout>}/>
                <Route path="/music" render={() => <Layout>Music Page</Layout>}/>
                <Route path="/settings" render={() => <Layout>Settings Page</Layout>}/>

                <Route path={'/testpage'} component={TestPage}/>
                <Route path={'/formtestpage'} component={FormTestPage}/>

                {!authorized && <Route path="/" render={() => <Redirect to="/login"/>}/>}
                {authorized &&
                <Route path="/" render={() => <Redirect to={`/profile/${username}`}/>}/>}
            </Switch>
        </>
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

    if (!initialized) return <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Spinner size={100} thickness={8}/>
    </div>

    return (
        <App authorized={authorized} username={username}/>
    )
}

export default AppContainer
