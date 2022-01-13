import classes from './Dialogs.module.scss'
import NewMessageForm from "../NewMessageForm/NewMessageForm";
import Card from "../common/Card/Card";
import React, {useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import {MessageType, UserType} from '../../types/types'
import Avatar from '../common/Avatar/Avatar'
import {StateType} from '../../redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/reducers/chat.reducer'

type PropsType = {
    messages: Array<MessageType>
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

const Message: React.FC<{message: MessageType, authUser: string}> = ({message, authUser}) => {
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

// const socket = io('http://localhost:5000', {withCredentials: true})
const DialogsContainer: React.FC = () => {
    const authUser = useSelector((state: StateType) => state.auth.username)
    const messages = useSelector((state: StateType) => state.chat.messages)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    // useEffect(() => {
    //
    //     const handleServerMessage = (message: MessageType) => {
    //         console.log('Message from server ' + message)
    //         setMessages((prevMessages) => [...prevMessages, message])
    //     }
    //     socket.on('server-message', handleServerMessage)
    // }, [])

    const onNewMessageSubmit = (message: string) => {
        dispatch(sendMessage(message))
    }


    return (
        <Dialogs onNewMessageSubmit={onNewMessageSubmit} messages={messages} authUser={authUser || ''}/>
    )
}

export default DialogsContainer