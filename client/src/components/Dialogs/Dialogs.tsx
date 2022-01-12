import classes from './Dialogs.module.scss'
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import Card from "../common/Card/Card";
import React, {useEffect, useState} from 'react'
import {io, Socket} from 'socket.io-client'
import {UserType} from '../../types/types'
import Avatar from '../common/Avatar/Avatar'
import {StateType} from '../../redux/store'
import {useSelector} from 'react-redux'

type PropsType = {
    messages: Array<{ author: UserType, text: string }>
    authUser: string
    onNewMessageSubmit: (message: string) => void
}

const Dialogs: React.FC<PropsType> = ({messages, authUser, onNewMessageSubmit}) => {
    return(
        <Card>
            <div className={classes.dialogs}>
                <div className={classes.messages}>
                    {messages.map(message => <Message message={message} authUser={authUser}/>)}
                </div>
                <div className={classes.newMessageForm}>
                    <NewMessageForm onSubmit={onNewMessageSubmit}/>
                </div>
            </div>
        </Card>
    )
}

const Message: React.FC<{message: { author: UserType, text: string }, authUser: string}> = ({message, authUser}) => {
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

const socket = io('http://localhost:5000', {withCredentials: true})
const DialogsContainer: React.FC = () => {
    const authUser = useSelector((state: StateType) => state.auth.username)
    const [messages, setMessages] = useState<Array<{ author: UserType, text: string }>>([])


    useEffect(() => {

        socket.on('server-message', (message) => {
            console.log('Message from server ' + message)
            setMessages((prevMessages) => [...prevMessages, message])
        })
    }, [])

    const onNewMessageSubmit = (message: string) => {
        if (socket) socket.emit('client-message', message)

    }


    return (
        <Dialogs onNewMessageSubmit={onNewMessageSubmit} messages={messages} authUser={authUser || ''}/>
    )
}

export default DialogsContainer