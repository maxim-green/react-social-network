import React, {useEffect, useState} from 'react'
import {NavLink, Redirect, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import classes from './Dialogs.module.scss'
import {AvatarType, DialogType, MessageType, UserItemDataType} from 'types/types'
import NewMessageForm from 'components/_forms/NewMessageForm/NewMessageForm'
import {Card} from 'components/_shared/Card/Card'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {StateType} from 'redux/store'
import {getDialogs, openDialog, sendMessage} from 'redux/reducers/dialogs.reducer'
import {useAuthCheck} from 'utils/hooks'
import {Button} from 'components/_shared/Button/Button'
import {List, ArrowLeft} from 'react-bootstrap-icons'
import classnames from 'classnames'

type PropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    currentCompanion?: UserItemDataType
    authUser: string
    onNewMessageSubmit: (message: string) => void
}

const Dialogs: React.FC<PropsType> = ({messages, dialogs, authUser, onNewMessageSubmit, currentCompanion}) => {
    const [listActive, setListActive] = useState<boolean>(false)

    const activateList = () => setListActive(true)
    const deactivateList = () => setListActive(false)


    return (
        <Card>
            <div className={classnames(classes.dialogs, {[classes.listActive]: listActive})}>
                <div className={classes.header}>
                    <div>
                        {!listActive && <Button type={'text'} size={'xl'} onClick={activateList}>
                            <Button.Icon><List width={22} height={22}/></Button.Icon>
                        </Button>}
                    </div>
                    <div>{currentCompanion?.firstName} {currentCompanion?.lastName}</div>
                    <div style={{marginRight: 10}}><Avatar smallImg={currentCompanion?.avatar.small} size={36}/></div>
                </div>
                <div className={classnames(classes.dialogsList, {[classes.listActive]: listActive})}>
                    <div style={{height: 65, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        {listActive && <Button type={'text'} size={'xl'} onClick={deactivateList}>
                            <Button.Icon><ArrowLeft width={22} height={22}/></Button.Icon>
                        </Button>}
                    </div>
                    {dialogs.map(d => <DialogButton key={d._id}
                                                    username={d.companion.username}
                                                    firstName={d.companion.firstName}
                                                    avatar={d.companion.avatar}
                    />)}
                </div>
                <div className={classes.messages}>
                    {messages.slice().reverse().map((message, index) => <Message key={index} message={message}
                                                                                 authUser={authUser}/>)}
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
            <Avatar size={30} name={firstName} smallImg={avatar.small}/>
        </NavLink>
    )
}

const Message: React.FC<{ message: MessageType, authUser: string }> = ({message, authUser}) => {
    return (
        <div className={(authUser === message.author.username) ? classes.messageSelf : classes.messageOther}>
            <div className={classes.messageAvatar}>
                <Avatar online smallImg={message.author.avatar.small} size={30}/>
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

    const dialogs = useSelector((state: StateType) => state.dialogs.dialogs.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt)
        const dateB = new Date(b.updatedAt)
        if (dateA > dateB) return -1
        if (dateA < dateB) return 1
        return 0
    }))
    const currentDialogId = useSelector((state: StateType) => state.dialogs.currentDialogId)
    const authUser = useSelector((state: StateType) => state.auth.user?.username)
    const messages = useSelector((state: StateType) => state.dialogs.messages)
    const currentCompanion = dialogs.find(dialog => dialog.companion.username === username)?.companion
    const dispatch = useDispatch()

    const onNewMessageSubmit = (message: string) => {
        if (message && currentDialogId) dispatch(sendMessage(message, currentDialogId))
    }

    useEffect(() => {
        dispatch(openDialog(username))
    }, [username, dispatch])

    useEffect(() => {
        dispatch(getDialogs())
    }, [dispatch])

    const authorized = useAuthCheck()
    if (!authorized) return <Redirect to={'/login'}/>

    // if no username specified in route, then redirect to latest dialog
    if (!username && dialogs[0] && dialogs.length !== 0) return <Redirect
        to={`/dialogs/${dialogs[0].companion.username}`}/>

    return <Dialogs onNewMessageSubmit={onNewMessageSubmit} messages={messages} dialogs={dialogs} currentCompanion={currentCompanion}
                    authUser={authUser || ''}/>
}

export default DialogsContainer