import UploadImageForm from "../../UploadImageForm/UploadImageForm";
import React from "react";
import {reduxForm} from "redux-form";

const EditAvatarForm = (props) => {
    return (
        <UploadImageForm name="avatar" {...props}/>
    )
}

export default reduxForm({
    form: 'uploadAvatar'
})(EditAvatarForm)