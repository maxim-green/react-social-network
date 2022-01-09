import classes from './NewMessageForm.module.scss'
import React from "react";
import {Button, InputTextarea} from "../forms/Form/Form";

const NewMessageForm: React.FC = () => {
    return (
        <form className={classes.newMessageForm}>
            <InputTextarea name={'newMessageInput'} />
            <div className={classes.button}>
                <Button>Send</Button>
            </div>
        </form>
    )
}

export default NewMessageForm