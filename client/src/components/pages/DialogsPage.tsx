import Layout from "../Layout/Layout";
import Dialogs from "../Dialogs/Dialogs";
import React from "react";

const DialogsPage:React.FC = () => {
    return (
        <Layout sidebar>
            <Dialogs/>
        </Layout>
    )
}

export default DialogsPage