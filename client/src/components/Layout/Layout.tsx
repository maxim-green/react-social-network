import React, {useEffect} from 'react'
import Header from '../Header/Header'
import classes from './Layout.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import Card from '../common/Card/Card'
import LoginForm from '../forms/LoginForm'
import SidebarNavigation from '../SideBar/SidebarNavigation/SidebarNavigation'
import SidebarFriends from '../SideBar/SidebarFriends/SidebarFriends'
import {getFriends} from '../../redux/reducers/users.reducer'
import {UserType} from '../../types/types'

type PropsType = {
    sidebar?: boolean
}

const Layout: React.FC<PropsType & {friends: Array<UserType>}> = ({children, sidebar= false, friends}) => {
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    return (
        <div className={classes.layout}>
            <AppBar>
                <Header/>
            </AppBar>
            <Main>
                {sidebar && <Sidebar>
                    {!authorized && <Card><LoginForm compact={true}/></Card>}
                    {authorized && <SidebarNavigation/>}
                    {authorized && <SidebarFriends friends={friends}/>}
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

const LayoutContainer: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const friends = useSelector((state: StateType) => state.users.friends)

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    return  <Layout {...props} friends={friends}/>
}

export default LayoutContainer