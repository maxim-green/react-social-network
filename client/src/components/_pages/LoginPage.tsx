import React from 'react'
import NavTabs from 'components/_shared/NavTabs/NavTabs'
import NavTab from 'components/_shared/NavTabs/NavTab/NavTab'
import {Card} from 'components/_shared/Card/Card'
import LoginForm from 'components/_forms/LoginForm'
import Layout, {Centered} from 'components/Layout/Layout'

// todo: refactor registration page and login page
const LoginPage: React.FC = () => {
    return (
        <Layout>
            <Centered>
                <div style={{maxWidth: 600, width: '100%'}}>
                <Card>
                    <NavTabs>
                        <NavTab to="/login">Log In</NavTab>
                        <NavTab to="/register">Sign Up</NavTab>
                    </NavTabs>
                    <div style={{padding: '28px'}}>
                        <LoginForm />
                    </div>
                </Card>
                </div>
            </Centered>
        </Layout>
    )
}

export default LoginPage