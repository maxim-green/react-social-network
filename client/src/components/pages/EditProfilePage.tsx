import React from 'react'
import Card from '../common/Card/Card'
import EditProfileForm from '../forms/EditProfileForm'
import Layout from '../Layout/Layout'

const EditProfilePage: React.FC = (props) => {
    return (
        <Layout sidebar={true}>
            <Card>
                <EditProfileForm />
            </Card>
        </Layout>
    )
}

export default EditProfilePage