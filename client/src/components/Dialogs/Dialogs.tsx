import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Dialogs.module.scss'
import {AvatarType, DialogType, MessageType, UserItemDataType} from 'types/types'
import NewMessageForm from 'components/_forms/NewMessageForm/NewMessageForm'
import {Card} from 'components/_shared/Card/Card'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Button} from 'components/_shared/Button/Button'
import {ArrowLeft, List} from 'react-bootstrap-icons'
import classnames from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'
import {readMessage} from '../../redux/reducers/dialogs.reducer'
import {useDispatch} from 'react-redux'

type PropsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    currentCompanion?: UserItemDataType
    authUser: string
    onNewMessageSubmit: (message: string) => void
}

const Dialogs: React.FC<PropsType> = ({messages, dialogs, authUser, onNewMessageSubmit, currentCompanion}) => {
    const [listActive, setListActive] = useState<boolean>(false)

    const showDialogsList = () => setListActive(true)
    const hideDialogsList = () => setListActive(false)


    return (
        <Card>
            <div className={classnames(classes.dialogs, {[classes.listActive]: listActive})}>

                <div className={classes.header}>
                    <div>
                        {!listActive && <Button type={'text'} size={'xl'} onClick={showDialogsList}>
                            <Button.Icon><List width={22} height={22}/></Button.Icon>
                        </Button>}
                    </div>
                    <div style={{fontWeight: 700}}>
                        {currentCompanion?.firstName} {currentCompanion?.lastName}
                    </div>
                    <div style={{marginRight: 10}}>
                        <Avatar smallImg={currentCompanion?.avatar.small} size={36}/>
                    </div>
                </div>

                <div className={classnames(classes.dialogsList, {[classes.listActive]: listActive})}>
                    <div style={{height: 65, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        {listActive && <Button type={'text'} size={'xl'} onClick={hideDialogsList}>
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
                    {messages.slice().reverse().map((message) => <Message key={message._id} message={message}
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
    const isAuthor = authUser === message.author.username
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    // todo think better way to read message. for example send 'read-message' event and handle it on server
    const visibilityChangeHandler = (isVisible: boolean) => {
        setVisible(isVisible)
        if (visible && !message.isRead) dispatch(readMessage(message.dialog))
    }

    useEffect(() => {
        if (visible && !message.isRead && !isAuthor) dispatch(readMessage(message._id))
    }, [visible])
    return (
        <VisibilitySensor onChange={visibilityChangeHandler}>
            <div className={isAuthor ? classes.messageSelf : classes.messageOther}>
                <div className={classes.messageAvatar}>
                    <Avatar online smallImg={message.author.avatar.small} size={30}/>
                </div>
                <div>
                    <div className={classes.messageAuthorName}>{message.author.firstName}</div>
                    <div>{message.text}</div>
                </div>
            </div>
        </VisibilitySensor>
    )
}

export default Dialogs
