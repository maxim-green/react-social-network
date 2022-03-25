import React from 'react'
import NavTabs from 'components/_shared/NavTabs/NavTabs'
import NavTab from 'components/_shared/NavTabs/NavTab/NavTab'
import {Card} from 'components/_shared/Card/Card'
import RegistrationForm from 'components/_forms/RegistrationForm'
import Layout, {Centered} from 'components/Layout/Layout'
import {useAuthCheck} from 'utils/hooks'
import {Redirect} from 'react-router-dom'

// todo: refactor registration page and login page
const RegistrationPage: React.FC = () => {
    const authorized = useAuthCheck()
    if (authorized) return <Redirect to={`/profile`}/>

    return (
        <Layout background={true}>
                <Centered>
                    <div style={{maxWidth: 600, width: '100%'}}>
                        <Card>
                            <NavTabs>
                                <NavTab to="/login">Log In</NavTab>
                                <NavTab to="/register">Sign Up</NavTab>
                            </NavTabs>
                            <div style={{padding: '28px'}}>
                                <RegistrationForm />
                            </div>
                        </Card>
                    </div>
                </Centered>
        </Layout>
    )
}

export default RegistrationPage