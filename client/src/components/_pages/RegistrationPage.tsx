import React from 'react'
import NavTabs from 'components/_shared/NavTabs/NavTabs'
import NavTab from 'components/_shared/NavTabs/NavTab/NavTab'
import {Card} from 'components/_shared/Card/Card'
import RegistrationForm from 'components/_forms/RegistrationForm'
import Layout from 'components/Layout/Layout'

const RegistrationPage: React.FC = () => {
    return (
        <Layout>
            <div style={{ margin: '120px auto 0 auto', maxWidth: '650px', width: '100%' }}>
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
        </Layout>
    )
}

export default RegistrationPage