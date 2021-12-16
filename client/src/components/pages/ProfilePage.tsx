import React from 'react'
import Profile from '../Profile/Profile'
import Layout from '../Layout/Layout'


const ProfilePage: React.FC = (props) => {
    return (
        <Layout sidebar={true}>
            <Profile/>
        </Layout>
    )
}

export default ProfilePage