import React, {useState} from 'react'
import classes from './Dialogs.module.scss'
import {DialogType, MessageType, UserItemDataType} from 'types/types'
import NewMessageForm from 'components/_forms/NewMessageForm/NewMessageForm'
import {Card} from 'components/_shared/Card/Card'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Button} from 'components/_shared/Button/Button'
import {ArrowLeft, List} from 'react-bootstrap-icons'
import classnames from 'classnames'
import {Message} from 'components/Dialogs/Message/Message'
import {DialogButton} from 'components/Dialogs/DialogButton/DialogButton'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'
import {checkOnline, trimString} from 'utils/functions'
import {DialogHeader} from 'components/Dialogs/DialogHeader/DialogHeader'
import {Visibility} from 'components/_shared/Visibility/Visibility'

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
                    <div className={classes.dialogsListSwitch}>
                        {!listActive && <Button type={'text'} size={'xl'} onClick={showDialogsList}>
                            <Button.Icon><List width={22} height={22}/></Button.Icon>
                        </Button>}
                        {listActive && <Button type={'text'} size={'xl'} onClick={hideDialogsList}>
                            <Button.Icon><ArrowLeft width={22} height={22}/></Button.Icon>
                        </Button>}
                    </div>
                        {!!currentCompanion && <DialogHeader companion={currentCompanion}/>}
                </div>

                <div className={classnames(classes.dialogsList, {[classes.listActive]: listActive})}>
                    {dialogs.map(d => <DialogButton key={d._id}
                                                    username={d.companion.username}
                                                    firstName={d.companion.firstName}
                                                    lastName={d.companion.lastName}
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

export default Dialogs
