import React, {useEffect} from 'react'
import NavTabs from '../../common/NavTabs/NavTabs'
import NavTab from '../../common/NavTabs/NavTab/NavTab'
import Card from '../../common/Card/Card'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import classes from './RegistrationPage.module.scss'
import {connect} from 'react-redux'
import {register, authActions} from '../../../redux/reducers/auth.reducer'
import {StateType} from '../../../redux/store'
import {RegistrationDataType} from '../../../types/types'

type MapStatePropsType = {
    registrationSuccessful: boolean
}

type MapDispatchPropsType = {
    register: (registrationData: RegistrationDataType) => void
    setRegistrationSuccessful: (registrationSuccessful: boolean) => void
}

type NativePropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const RegistrationPage: React.FC<PropsType & {onSubmit: any}> = ({onSubmit, registrationSuccessful}) => {
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

const RegistrationPageContainer: React.FC<PropsType> = (props) => {
    const {setRegistrationSuccessful, register} = props
    useEffect(() => {
        setRegistrationSuccessful(false)
    }, [setRegistrationSuccessful])

    const onSubmit = async (registrationFormData: RegistrationDataType) => {
        register(registrationFormData)
    }

    return (
        <RegistrationPage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        registrationSuccessful: state.auth.registrationSuccessful
    }
}

const {setRegistrationSuccessful} = authActions
export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {register, setRegistrationSuccessful}
    )(RegistrationPageContainer)