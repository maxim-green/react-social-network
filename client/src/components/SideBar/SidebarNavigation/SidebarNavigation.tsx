import {NavLink} from 'react-router-dom'
import React from 'react'
import classes from './SidebarNavigation.module.scss'

import {Card} from 'components/_shared/Card/Card'
import {PersonLinesFill, ChatLeftTextFill, PeopleFill, GearWide} from 'react-bootstrap-icons'
import {Button} from 'components/_shared/Button/Button'

type PropsType = {}

const SidebarNavigation: React.FC<PropsType> = () => {
    return (
        <Card>
            <div className={classes.Navigation}>
                <List>
                    <Item to='/profile'>
                        <Button type={'link'} size={'large'}>
                            <Button.Icon><PersonLinesFill/></Button.Icon>
                            <Button.Text>Profile</Button.Text>
                        </Button>
                    </Item>
                    <Item to='/dialogs'>
                        <Button type={'link'} size={'large'}>
                            <Button.Icon><ChatLeftTextFill/></Button.Icon>
                            <Button.Text>Dialogs</Button.Text>
                        </Button>
                    </Item>
                    <Item to='/users'>
                        <Button type={'link'} size={'large'}>
                            <Button.Icon><PeopleFill/></Button.Icon>
                            <Button.Text>Users</Button.Text>
                        </Button>
                    </Item>
                    <Item to='/settings'>
                        <Button type={'link'} size={'large'}>
                            <Button.Icon><GearWide/></Button.Icon>
                            <Button.Text>Settings</Button.Text>
                        </Button>
                    </Item>
                </List>
            </div>
        </Card>
    )
}

const List: React.FC = ({children}) => {
    return (
        <ul>
            {children}
        </ul>
    )
}

const Item: React.FC<{to: string}> = ({to, children}) => {
    return (
        <li>
            <NavLink to={to}>
                {children}
            </NavLink>
        </li>
    )
}

export default SidebarNavigation