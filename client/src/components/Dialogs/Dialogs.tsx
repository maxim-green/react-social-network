import classes from './Dialogs.module.scss'
import NewMessageForm from '../NewMessageForm/NewMessageForm'
import Card from '../common/Card/Card'
import React, {useEffect} from 'react'
import {MessageType} from '../../types/types'
import Avatar from '../common/Avatar/Avatar'
import {StateType} from '../../redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/reducers/chat.reducer'
import {NavLink} from 'react-router-dom'

type PropsType = {
    messages: Array<MessageType>
    authUser: string
    onNewMessageSubmit: (message: string) => void
}

const Dialogs: React.FC<PropsType> = ({messages, authUser, onNewMessageSubmit}) => {
    console.log(messages)
    console.log(messages.reverse())
    return (
        <Card>
            <div className={classes.dialogs}>
                <div className={classes.dialogsList}>
                    <DialogButton username={'bilbobaggins'} firstName={'Bilbo'}/>
                    <DialogButton username={'frodobaggins'} firstName={'Frodo'}/>
                    <DialogButton username={'gandalf'} firstName={'Gandalf'}/>
                </div>
                <div className={classes.messages}>
                    {messages.slice().reverse().map(message => <Message message={message} authUser={authUser}/>)}
                </div>
                <div className={classes.newMessageForm}>
                    <NewMessageForm onSubmit={onNewMessageSubmit}/>
                </div>
            </div>
        </Card>
    )
}

type DialogButtonType = { username: string, firstName: string }
const DialogButton: React.FC<DialogButtonType> = ({username, firstName}) => {
    return (
            <NavLink to={`/dialogs/${username}`} className={classes.dialogButton} activeClassName={classes.active}>
                    <Avatar size={'xs'} name={firstName}/>
            </NavLink>
    )
}

const Message: React.FC<{ message: MessageType, authUser: string }> = ({message, authUser}) => {
    return (
        <div className={(authUser === message.author.username) ? classes.messageSelf : classes.messageOther}>
            <div className={classes.messageAvatar}>
                <Avatar online img={message.author.avatar.small} size={'xs'}/>
            </div>
            <div>
                <div className={classes.messageAuthorName}>{message.author.firstName}</div>
                <div>{message.text}</div>
            </div>
        </div>
    )
}


const DialogsContainer: React.FC = () => {
    const authUser = useSelector((state: StateType) => state.auth.username)
    const messages = useSelector((state: StateType) => state.chat.messages)
    const dispatch = useDispatch()

    const onNewMessageSubmit = (message: string) => {
        dispatch(sendMessage(message))
    }


    return (
        <Dialogs onNewMessageSubmit={onNewMessageSubmit} messages={messages} authUser={authUser || ''}/>
    )
}

export default DialogsContainer