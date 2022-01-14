import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LoginPageContainer from './pages/LoginPage'
import RegistrationPageContainer from './pages/RegistrationPage'
import {connect, useDispatch, useSelector} from 'react-redux'
import ProfilePage from './pages/ProfilePage'
import UsersPage from './pages/UsersPage'
import {initializeApp} from '../redux/reducers/app.reducer'
import {StateType} from '../redux/store'
import Layout from './Layout/Layout'
import TestPage from './TestPage'
import DialogsPage from "./pages/DialogsPage";
import {
    startMessagesListening,
    startSocketListening,
    stopMessagesListening,
    stopSocketListening
} from '../redux/reducers/chat.reducer'

type MapStatePropsType = {
    initialized: boolean,
    authorized: boolean,
    username: string | null
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type NativePropsType = {}

type PropsType = NativePropsType & MapStatePropsType & MapDispatchPropsType

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
                        <Route path="/profile/edit" component={ProfilePage}/>
                        <Route exact path="/profile/:username" component={ProfilePage}/>

                        <Route path="/users/:filter?" component={UsersPage}/>
                        <Route path="/dialogs" component={DialogsPage}/>
                        <Route path="/photos" render={() => <Layout>Photos Page</Layout>}/>
                        <Route path="/music" render={() => <Layout>Music Page</Layout>}/>
                        <Route path="/settings" render={() => <Layout>Settings Page</Layout>}/>
                        <Route path="/friends" render={() => <Layout>Friends Page</Layout>}/>
                        <Route path={'/testpage'} component={TestPage}/>

                        {!authorized && <Route path="/" render={() => <Redirect to="/login"/>}/>}
                        {authorized &&
                        <Route path="/" render={() => <Redirect to={`/profile/${username}`}/>}/>}
                    </Switch>
        </>
    )
}

// Container
const AppContainer: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    const {initialized, initializeApp} = props

    useEffect(() => {
        console.log('App mounted')
        initializeApp()
    }, [])

    // todo Maybe it would be better to dispatch it somewhere else? (in thunk or in check auth hook)
    useEffect(() => {
        if(!authorized) {
            dispatch(stopSocketListening())
            dispatch(stopMessagesListening())
        }
    }, [authorized])

    if (!initialized) return <div>Initializing...</div>

    return (
        <App {...props}/>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized,
        authorized: state.auth.authorized,
        username: state.auth.username
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps, {initializeApp}
)(AppContainer)
