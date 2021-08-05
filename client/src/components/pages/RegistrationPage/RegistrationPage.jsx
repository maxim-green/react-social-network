import React, {useEffect} from 'react'
import NavTabs from "../../common/NavTabs/NavTabs";
import NavTab from "../../common/NavTabs/NavTab/NavTab";
import Card from "../../common/Card/Card";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import classes from "./RegistrationPage.module.scss"
import {connect} from "react-redux";
import {register, setRegistrationSuccessfulAC} from "../../../redux/reducers/auth.reducer";

const RegistrationPage = ({onSubmit, registrationSuccessful}) => {
    return (
            <div className={classes.registrationPage}>
                <Card>
                    <NavTabs>
                        <NavTab to="/login">Log In</NavTab>
                        <NavTab to="/register">Sign Up</NavTab>
                    </NavTabs>
                    <RegistrationForm registrationSuccessful={registrationSuccessful} onSubmit={onSubmit}/>
                </Card>
            </div>
    )
}

const RegistrationPageContainer = (props) => {
    const {setRegistrationSuccessfulAC} = props
    useEffect(() => {
        setRegistrationSuccessfulAC(false)
    }, [setRegistrationSuccessfulAC])

    const onSubmit = async ({firstName, lastName, username, email, password}) => {
        props.register(firstName, lastName, username, email, password)
    }

    return (
        <RegistrationPage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state) => {
    return {
        registrationSuccessful: state.auth.registrationSuccessful
    }
}

export default connect(mapStateToProps, {register, setRegistrationSuccessfulAC})(RegistrationPageContainer)