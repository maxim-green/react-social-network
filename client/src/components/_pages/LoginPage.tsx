import React from 'react'
import LoginForm from 'components/_forms/LoginForm'
import {useAuthCheck} from 'utils/hooks'
import {Redirect} from 'react-router-dom'
import {AuthCard} from 'components/AuthCard/AuthCard'

const LoginPage: React.FC = () => {
    const authorized = useAuthCheck()
    if (authorized) return <Redirect to={`/feed`}/>

    return <AuthCard>
        <LoginForm/>
    </AuthCard>
}

export default LoginPage