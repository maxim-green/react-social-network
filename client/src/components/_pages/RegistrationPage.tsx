import React from 'react'
import NavTabs from '../_shared/NavTabs/NavTabs'
import NavTab from '../_shared/NavTabs/NavTab/NavTab'
import Card from '../_shared/Card/Card'
import RegistrationForm from '../_forms/RegistrationForm'
import Layout from '../Layout/Layout'

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