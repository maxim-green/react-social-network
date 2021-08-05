import React from 'react'
import NavTabs from "../../common/NavTabs/NavTabs";
import NavTab from "../../common/NavTabs/NavTab/NavTab";
import Card from "../../common/Card/Card";
import LoginForm from "./LoginForm/LoginForm";
import classes from "./LoginPage.module.scss"
import {login} from "../../../redux/reducers/auth.reducer";
import {connect} from "react-redux";

const LoginPage = ({onSubmit}) => {
    return (
        <div className={classes.LoginPage}>
            <Card width="650px">
                <NavTabs>
                    <NavTab to="/login">Log In</NavTab>
                    <NavTab to="/register">Sign Up</NavTab>
                </NavTabs>
                <LoginForm onSubmit={onSubmit}/>
            </Card>
        </div>
    )
}

const LoginPageContainer = (props) => {
    const onSubmit = ({email, password, rememberMe}) => {
        props.login(email, password, rememberMe)
    }

    return (
        <LoginPage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {login})(LoginPageContainer)