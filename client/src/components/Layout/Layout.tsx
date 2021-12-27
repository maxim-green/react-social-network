import React from 'react'
import Header from '../Header/Header'
import classes from './Layout.module.scss'
import {useSelector} from 'react-redux'
import {StateType} from '../../redux/store'
import Card from '../common/Card/Card'
import LoginForm from '../forms/LoginForm'
import SidebarNavigation from '../SideBar/SidebarNavigation/SidebarNavigation'
import SidebarFriends from '../SideBar/SidebarFriends/SidebarFriends'

type PropsType = {
    sidebar?: boolean
}

const Layout: React.FC<PropsType> = ({children, sidebar= false}) => {
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    return (
        <div className={classes.layout}>
            <AppBar>
                <Header/>
            </AppBar>
            <Main>
                {sidebar && <Sidebar>
                    {!authorized && <Card><LoginForm/></Card>}
                    {authorized && <SidebarNavigation/>}
                    {authorized && <SidebarFriends friendsCount={45}/>}
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

export default Layout