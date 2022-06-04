import React from 'react'
import classes from 'components/Layout/Header/Header.module.scss'
import {UserControl} from 'components/Layout/Header/UserControl/UserControl'
import {Logo} from 'components/_shared/Logo/Logo'
import {Col, Row, Space} from '../../_shared/Flex/Flex'
import {Button} from '../../_shared/Button/Button'
import {NavLink} from 'react-router-dom'

type PropsType = {
    authorized: boolean
    username?: string
    avatar?: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
    <Row horizontalAlign={'space-between'} verticalAlign={'center'} gap={10}>
        <Logo/>
        <Space/>
        {props.authorized && <div className={classes.userControl}>
            <UserControl username={props.username} avatar={props.avatar} logout={props.logout}/>
        </div>}
        {props.authorized && <Col>
            <Button type={'secondary'} size={'md'} onClick={() => props.logout()}>Log out</Button>
        </Col>}
        {!props.authorized && <Col>
            <NavLink to={`/login`} style={{color: 'white'}}>
                    <Button type={'secondary'} size={'md'}>Log in</Button>
            </NavLink>
        </Col>}
        {!props.authorized && <Col>
            <NavLink to={`/register`} style={{color: 'white'}}>
                <Button type={'secondary'} size={'md'}>Sign up</Button>
            </NavLink>
        </Col>}
    </Row>
    )
}

export default Header
