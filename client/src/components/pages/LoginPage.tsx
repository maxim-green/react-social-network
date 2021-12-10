import React from 'react'
import NavTabs from '../common/NavTabs/NavTabs'
import NavTab from '../common/NavTabs/NavTab/NavTab'
import Card from '../common/Card/Card'
import LoginForm from '../forms/LoginForm'

const LoginPage: React.FC = () => {
    return (
        <div style={{ margin: '0 auto', maxWidth: '650px', width: '100%' }}>
            <Card>
                <NavTabs>
                    <NavTab to="/login">Log In</NavTab>
                    <NavTab to="/register">Sign Up</NavTab>
                </NavTabs>
                <LoginForm />
            </Card>
        </div>
    )
}

export default LoginPage