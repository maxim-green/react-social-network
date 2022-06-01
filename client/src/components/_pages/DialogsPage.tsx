import Dialogs from 'components/Dialogs/Dialogs'
import React, {useEffect} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store/store'
import {closeDialog, getDialogs, openDialog, sendMessage} from 'store/reducers/dialogs.reducer'
import {Helmet} from 'react-helmet'
import {useAuth} from '../../hooks/useAuth'


const DialogsPage: React.FC = () => {
    const {username}: { username: string } = useParams()
    const dialogs = useSelector((state: RootState) => state.dialogs.dialogs.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt)
        const dateB = new Date(b.updatedAt)
        if (dateA > dateB) return -1
        if (dateA < dateB) return 1
        return 0
    }))
    const currentDialogId = useSelector((state: RootState) => state.dialogs.currentDialogId)
    const authUser = useSelector((state: RootState) => state.auth.user?.username)
    const messages = useSelector((state: RootState) => state.dialogs.messages)
    const currentCompanion = dialogs.find(dialog => dialog.companion.username === username)?.companion


    const dispatch = useDispatch()

    const onNewMessageSubmit = (message: string) => {
        if (message.trim() && currentDialogId) dispatch(sendMessage(message.trim(), currentDialogId))
    }

    useEffect(() => {
        dispatch(openDialog(username))
        return () => {
            dispatch(closeDialog())
        }
    }, [username, dispatch])

    useEffect(() => {
        dispatch(getDialogs())
    }, [dispatch])

    useEffect(() => {
        // console.log('message updated')
        // if (currentDialogId) dispatch(readMessages(currentDialogId))
    }, [messages, dispatch])


    const authorized = useAuth()
    if (!authorized) return <Redirect to={'/login'}/>


    // if no username specified in route, then redirect to latest dialog
    if (!username && dialogs[0] && dialogs.length !== 0) return <Redirect
        to={`/dialogs/${dialogs[0].companion.username}`}/>


    return <>
        {currentCompanion && <Helmet>
            <title>Dialog - {currentCompanion.firstName} {currentCompanion.lastName}</title>
        </Helmet>}
        <Dialogs
        messages={messages}
        dialogs={dialogs}
        currentCompanion={currentCompanion}
        authUser={authUser || ''}
        onNewMessageSubmit={onNewMessageSubmit}
    /></>
}


export default DialogsPage
