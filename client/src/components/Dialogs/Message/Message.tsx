import React, {useEffect, useState} from 'react'
import classes from './Message.module.scss'
import {MessageType} from 'types/types'
import {useDispatch} from 'react-redux'
import {readMessage} from 'store/reducers/dialogs.reducer'
import VisibilitySensor from "react-visibility-sensor"
import {Row, Space} from 'components/_shared/Flex/Flex'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {checkOnline} from 'utils/functions'
import {Check, CheckAll} from 'react-bootstrap-icons'

type Props = { message: MessageType, authUser: string }

export const Message: React.FC<Props> = ({message, authUser}) => {
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
                <Row gap={10}>
                    <div className={classes.messageAvatar}>
                        <Avatar online={checkOnline(message.author.updatedAt)} smallImg={message.author.avatar.small} size={30}/>
                    </div>
                    <div>
                        <div className={classes.messageAuthorName}>{message.author.firstName}</div>
                        <div>{message.text}</div>
                    </div>
                    <Space/>
                    <div>
                        {message.isRead ? <CheckAll/> : <Check/>}
                    </div>
                </Row>
            </div>
        </VisibilitySensor>
    )
}
