import classes from './App.module.scss';
import React, {useEffect} from "react";
import Header from "./Header/Header";
import Container from "./common/Container/Container";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPageContainer from "./pages/LoginPage/LoginPage";
import RegistrationPageContainer from "./pages/RegistrationPage/RegistrationPage";
import {connect} from "react-redux";
import SideBar from "./SideBar/SideBar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import {initializeApp} from "../redux/reducers/app.reducer";
import UploadForm from "./UploadForm";

const App = (props) => {
    return (
        <div className={classes.app}>
            <AppBar>
                <Header/>
            </AppBar>

            <Main>
                <SideBar authorized={props.authorized}/>

                <Content>
                    <Switch>
                        {!props.authorized && <Route path="/login" component={LoginPageContainer}/>}
                        {props.authorized && <Route path="/login" render={() => <Redirect to={`/profile/${props.username}`}/>}/>}

                        {!props.authorized && <Route path="/register" component={RegistrationPageContainer}/>}
                        {props.authorized && <Route path="/register" render={() => <Redirect to={`/profile/${props.username}`}/>}/>}

                        {!props.authorized && <Route path="/profile/edit" render={() => <Redirect to="/login"/>}/>}
                        <Route path="/profile/edit" component={EditProfilePage}/>
                        <Route exact path="/profile/:username" component={ProfilePage}/>

                        <Route path="/users" component={UsersPage}/>
                        <Route path="/dialogs" render={() => <>Dialogs Page</>}/>
                        <Route path="/photos" render={() => <>Photos Page</>}/>
                        <Route path="/music" render={() => <>Music Page</>}/>
                        <Route path="/settings" render={() => <>Settings Page</>}/>
                        <Route path="/friends" render={() => <>Friends Page</>}/>
                        <Route path="/upload-image" component={UploadForm}/>

                        {!props.authorized && <Route path="/" render={() => <Redirect to="/login"/>}/>}
                        {props.authorized && <Route path="/" render={() => <Redirect to={`/profile/${props.username}`}/>}/>}
                    </Switch>
                </Content>
            </Main>
        </div>
    );
}

const Main = ({children}) => {
    return (
        <Container>
            <div className={classes.main}>
                {children}
            </div>
        </Container>
    )
}

const AppBar = ({children}) => {
    return (
        <div className={classes.appBar}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

const Content = ({children}) => {
    return (
        <div className={classes.content}>
                {children}
        </div>
    )
}

const AppContainer = (props) => {
    const {initialized, initializeApp} = props
    useEffect(() => {
        initializeApp()
    }, [initialized, initializeApp])

    if (!initialized) return <div>Initializing...</div>

    return (
        <App {...props}/>
    )
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
        authorized: state.auth.authorized,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, {initializeApp})(AppContainer);
