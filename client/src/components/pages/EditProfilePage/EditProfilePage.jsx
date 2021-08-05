import React from "react";
import Card from "../../common/Card/Card";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import {connect} from "react-redux";
import {updateProfile} from "../../../redux/reducers/profile.reducer";

const EditProfilePage = (props) => {
    return (
        <Card>
            <EditProfileForm
                onSubmit={props.onSubmit}
                initialValues={props.profileData}
            />
        </Card>
    )
}

const EditProfilePageContainer = (props) => {

    const onSubmit = (profileData) => {
        props.updateProfile(profileData)
    }

    return (
        <EditProfilePage {...props} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = (state) => {
    return {
        profileData: state.profile,
    }
}

export default connect(mapStateToProps,{updateProfile})(EditProfilePageContainer)