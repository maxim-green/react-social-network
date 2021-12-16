import Users from '../Users/Users'
import React from 'react'
import Layout from '../Layout/Layout'

const UsersPage: React.FC = () => {
    return (
        <Layout sidebar={true}>
            <Users />
        </Layout>
    )
}

export default UsersPage