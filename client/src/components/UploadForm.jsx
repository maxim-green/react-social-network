import React from "react";

const UploadForm = (props) => {
    return(
        <form method="PUT" formEncType="multipart/form-data" formAction="http://localhost:5000/api/profile/avatar">
            <input type="file" name="file"/>
            <button>Upload</button>
        </form>
    )
}

export default UploadForm