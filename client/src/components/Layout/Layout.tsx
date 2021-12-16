import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../SideBar/Sidebar'
import classes from './Layout.module.scss'
import Container from '../common/Container/Container'
import {useSelector} from 'react-redux'
import {StateType} from '../../redux/store'

type PropsType = {
    sidebar?: boolean
}

const Layout: React.FC<PropsType> = ({children, sidebar= false}) => {
    const authorized = useSelector((state: StateType) => state.auth.authorized)
    return (
        <div>
            <AppBar>
                <Header/>
            </AppBar>
            <Main>
                {sidebar && <Sidebar authorized={authorized}/>}

                <Content>
                    {children}
                </Content>
            </Main>
        </div>
    )
}

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

export default Layout