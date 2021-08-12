import React from 'react'
import NavTabs from '../../common/NavTabs/NavTabs'
import NavTab from '../../common/NavTabs/NavTab/NavTab'
import Card from '../../common/Card/Card'
import LoginForm from './LoginForm/LoginForm'
import classes from './LoginPage.module.scss'
import {login} from '../../../redux/reducers/auth.reducer'
import {connect} from 'react-redux'
import {StateType} from '../../../redux/store'
import {LoginDataType} from '../../../types/types'

type MapStatePropsType = {}

type MapDispatchPropsType = {
    login: (loginFormData: LoginDataType) => void
}

type NativePropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const LoginPage: React.FC<PropsType & { onSubmit: any }> = ({onSubmit}) => {
    return (
        <div className={classes.LoginPage}>
            <Card>
                <NavTabs>
                    <NavTab to="/login">Log In</NavTab>
                    <NavTab to="/register">Sign Up</NavTab>
                </NavTabs>
                <LoginForm onSubmit={onSubmit}/>
            </Card>
        </div>
    )
}

const LoginPageContainer: React.FC<PropsType> = (props) => {
    const onSubmit = (loginFormData: LoginDataType) => {
        props.login(loginFormData)
    }

    return (
        <LoginPage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {}
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {login}
)(LoginPageContainer)