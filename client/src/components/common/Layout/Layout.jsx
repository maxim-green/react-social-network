import React from "react";
import classes from "./Layout.module.scss"

const Layout = ({children}) => {
    return (
        <div className={classes.layout}>
            {children}
        </div>
    )
}

const Container = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

const Toolbar = ({children}) => {
    return (
        <div className={classes.toolbar}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

const Sidebar = ({children}) => {
    return (
        <div className={classes.sidebar}>
            {children}
        </div>
    )
}

const Main = ({children}) => {
    return (
        <div className={classes.main}>
            {children}
        </div>
    )
}

Layout.Container = Container
Layout.Toolbar = Toolbar
Layout.Sidebar = Sidebar
Layout.Main = Main

export default Layout