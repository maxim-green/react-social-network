import Dialogs from 'components/Dialogs/Dialogs'
import React, {useEffect} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {getDialogs, openDialog, sendMessage} from 'redux/reducers/dialogs.reducer'
import {useAuthCheck} from 'utils/hooks'


const DialogsPage: React.FC = () => {
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
        if (message.trim() && currentDialogId) dispatch(sendMessage(message.trim(), currentDialogId))
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


    return <Dialogs
        messages={messages}
        dialogs={dialogs}
        currentCompanion={currentCompanion}
        authUser={authUser || ''}
        onNewMessageSubmit={onNewMessageSubmit}
    />
}


export default DialogsPage