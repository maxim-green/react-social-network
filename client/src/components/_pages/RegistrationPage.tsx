import React from 'react'
import RegistrationForm from 'components/_forms/RegistrationForm'
import {useAuthCheck} from 'utils/hooks'
import {Redirect} from 'react-router-dom'
import {AuthCard} from 'components/AuthCard/AuthCard'

const RegistrationPage: React.FC = () => {
    const authorized = useAuthCheck()
    if (authorized) return <Redirect to={`/profile`}/>

    return <AuthCard>
        <RegistrationForm/>
    </AuthCard>
}

export default RegistrationPage