import Button from "../common/Button/Button";
import attachFileIcon from "../../assets/images/attach-file-icon.svg";
import Card from "../common/Card/Card";
import React from "react";
import classes from "./NewPostInput.module.scss"

type PropsType = {

}

const NewPostInput: React.FC<PropsType> = (props) => {
    return (
        <Card>
            <div className={classes.input}>
                <textarea name="newMessageInput" id="newMessageInput" cols={30} rows={2} placeholder="Say what is on your mind..."/>
            </div>
            <div className={classes.controls}>
                <Button icon={attachFileIcon} variant="text" size="sm"/>
                <button className={classes.button}>Send</button>
            </div>
        </Card>
    )
}

export default NewPostInput