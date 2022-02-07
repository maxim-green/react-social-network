import React, {useEffect} from 'react'
import Header from '../Header/Header'
import classes from './Layout.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import Card from '../_shared/Card/Card'
import LoginForm from '../_forms/LoginForm'
import SidebarNavigation from '../SideBar/SidebarNavigation/SidebarNavigation'
import SidebarFriends from '../SideBar/SidebarFriends/SidebarFriends'
import {AvatarType, UserItemDataType} from '../../types/types'
import {logout} from '../../redux/reducers/auth.reducer'

type PropsType = {
    sidebar?: boolean
    authUserName?: string
    authUserAvatar?: AvatarType
    subscriptions: Array<UserItemDataType>
    onLogout: () => void
}

const Layout: React.FC<PropsType> = ({children, sidebar= false, subscriptions, authUserName, authUserAvatar, onLogout}) => {
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    return (
        <div className={classes.layout}>
            <AppBar>
                <Header authorized={authorized} username={authUserName} avatar={authUserAvatar?.small} logout={onLogout}/>
            </AppBar>
            <Main>
                {sidebar && <Sidebar>
                    {!authorized && <Card><div style={{padding: '10px'}}><LoginForm compact={true}/></div></Card>}
                    {authorized && <SidebarNavigation/>}
                    {authorized && <SidebarFriends subscriptions={subscriptions}/>}
                </Sidebar>}

                <Content>
                    {children}
                </Content>
            </Main>
        </div>
    )
}

const Container: React.FC = ({children}) => <div className={classes.container}>
    {children}
</div>

const AppBar: React.FC = ({children}) => {
    return (
        <div className={classes.appBar}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

const Main: React.FC = ({children}) => {
    return (
        <Container>
            <div className={classes.main}>
                {children}
            </div>
        </Container>
    )
}

const Content: React.FC = ({children}) => {
    return (
        <div className={classes.content}>
            {children}
        </div>
    )
}

const Sidebar: React.FC = ({children}) => {
    return (
        <div className={classes.sidebar}>
            {children}
        </div>
    )
}

const LayoutContainer: React.FC<{ sidebar?: boolean }> = (props) => {
    const dispatch = useDispatch()
    const authUserSubscriptions = useSelector((state: StateType) => state.auth.user?.subscriptions || [])
    const authUserName = useSelector((state: StateType) => state.auth.user?.username)
    const authUserAvatar = useSelector((state: StateType) => state.auth.user?.avatar)

    const onLogout = () => {
        dispatch(logout())
    }

    return  <Layout {...props} subscriptions={authUserSubscriptions} authUserName={authUserName} authUserAvatar={authUserAvatar} onLogout={onLogout}/>
}

export default LayoutContainer