import classes from './Dialogs.module.scss'
import NewMessageForm from '../NewMessageForm/NewMessageForm'
import Card from '../common/Card/Card'
import React, {useEffect} from 'react'
import {AvatarType, DialogType, MessageType} from '../../types/types'
import Avatar from '../common/Avatar/Avatar'
import {StateType} from '../../redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {getDialogs, openDialog, sendMessage} from '../../redux/reducers/dialogs.reducer'
import {NavLink, useParams} from 'react-router-dom'

type PropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    authUser: string
    onNewMessageSubmit: (message: string) => void
}

const Dialogs: React.FC<PropsType> = ({messages, dialogs, authUser, onNewMessageSubmit}) => {
    return (
        <Card>
            <div className={classes.dialogs}>
                <div className={classes.dialogsList}>
                    {dialogs.map(d => <DialogButton key={d.id}
                                                    username={d.companionUser.username}
                                                    firstName={d.companionUser.firstName}
                                                    avatar={d.companionUser.avatar}
                    />)}
                </div>
                <div className={classes.messages}>
                    {messages.slice().reverse().map((message, index) => <Message key={index} message={message} authUser={authUser}/>)}
                </div>
                <div className={classes.newMessageForm}>
                    <NewMessageForm onSubmit={onNewMessageSubmit}/>
                </div>
            </div>
        </Card>
    )
}

type DialogButtonType = { username: string, firstName: string, avatar: AvatarType }
const DialogButton: React.FC<DialogButtonType> = ({username, firstName, avatar}) => {
    return (
            <NavLink to={`/dialogs/${username}`} className={classes.dialogButton} activeClassName={classes.active}>
                    <Avatar size={'xs'} name={firstName} img={avatar.small}/>
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
    const {username}: { username: string } = useParams()

    const currentDialogId = useSelector((state: StateType) => state.dialogs.currentDialogId)
    const authUser = useSelector((state: StateType) => state.auth.username)
    const messages = useSelector((state: StateType) => state.dialogs.messages)
    const dialogs = useSelector((state: StateType) => state.dialogs.dialogs)
    const dispatch = useDispatch()

    const onNewMessageSubmit = (message: string) => {
        if (message && currentDialogId) dispatch(sendMessage(message, currentDialogId))
    }

    useEffect(() => {
        dispatch(openDialog(username))
        dispatch(getDialogs())
    }, [username, dialogs])

    return (
        <Dialogs onNewMessageSubmit={onNewMessageSubmit} messages={messages} dialogs={dialogs} authUser={authUser || ''}/>
    )
}

export default DialogsContainer