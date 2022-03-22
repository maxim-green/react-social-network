import React from 'react'
import {StateType} from 'redux/store'
import {useDispatch, useSelector} from 'react-redux'
import classes from './Layout.module.scss'
import Header from 'components/Header/Header'
import {Card} from 'components/_shared/Card/Card'
import LoginForm from 'components/_forms/LoginForm'
import SidebarNavigation from 'components/SideBar/SidebarNavigation/SidebarNavigation'
import SidebarSubscriptions from 'components/SideBar/SidebarSubscriptions/SidebarSubscriptions'
import {AvatarType, UserItemDataType} from 'types/types'
import {logout} from 'redux/reducers/auth.reducer'
import {useBreakpoint} from 'utils/hooks'
import {BottomNavigation} from 'components/BottomNavigation/BottomNavigation'

type PropsType = {
    sidebar?: boolean
    authUserName?: string
    authUserAvatar?: AvatarType
    subscriptions: Array<UserItemDataType>
    onLogout: () => void
}

const Layout: React.FC<PropsType> = ({
                                         children,
                                         sidebar = false,
                                         subscriptions,
                                         authUserName,
                                         authUserAvatar,
                                         onLogout
                                     }) => {
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    const {tablet, phoneTablet} = useBreakpoint()
    return (
        <div className={classes.layout}>
            <AppBar>
                <Header authorized={authorized} username={authUserName} avatar={authUserAvatar?.small}
                        logout={onLogout}/>
            </AppBar>
            <Main>
                {sidebar && !tablet && <Sidebar>
                    {!authorized && <Card>
                        <div style={{padding: '10px'}}><LoginForm/></div>
                    </Card>}
                    {authorized && <SidebarNavigation/>}
                    {authorized && !tablet && <SidebarSubscriptions subscriptions={subscriptions}/>}
                </Sidebar>}

                <Content>
                    {children}
                </Content>
            </Main>

            {tablet && authUserAvatar && <BottomNavigation avatar={authUserAvatar?.small} authorized={authorized}/>}
            {tablet && !authUserAvatar && <BottomNavigation authorized={authorized}/>}
        </div>
    )
}

export const Centered: React.FC = ({children}) => {
    return (
        <div className={classes.contentCentered}>
            {children}
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

    return <Layout {...props} subscriptions={authUserSubscriptions} authUserName={authUserName}
                   authUserAvatar={authUserAvatar} onLogout={onLogout}/>
}

export default LayoutContainer