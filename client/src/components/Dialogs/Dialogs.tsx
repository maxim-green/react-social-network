import classes from './Dialogs.module.scss'
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import Card from "../common/Card/Card";
import React from "react";

const Dialogs: React.FC = () => {
    return(
        <Card>
            <div className={classes.dialogs}>
                <div className={classes.messages}>
                    Messages
                </div>
                <div className={classes.newMessageForm}>
                    <NewMessageForm/>
                </div>
            </div>
        </Card>
    )
}

export default Dialogs