import {NavLink} from 'react-router-dom'
import React from 'react'
import classes from './SidebarNavigation.module.scss'

import {Card} from 'components/_shared/Card/Card'
import {PersonLinesFill, ChatLeftTextFill, PeopleFill, GearWide} from 'react-bootstrap-icons'
import {Button} from 'components/_shared/Button/Button'
import {useBreakpoint} from 'utils/hooks'

type PropsType = {}

const SidebarNavigation: React.FC<PropsType> = () => {
    const {tablet} = useBreakpoint()

    return (
        <Card>
            <div className={classes.Navigation}>
                <List>
                    <Item to='/profile'>
                        <Button type={'link'} size={'lg'}>
                            <Button.Icon><PersonLinesFill/></Button.Icon>
                            {!tablet && <Button.Text>Profile</Button.Text>}
                        </Button>
                    </Item>
                    <Item to='/dialogs'>
                        <Button type={'link'} size={'lg'}>
                            <Button.Icon><ChatLeftTextFill/></Button.Icon>
                            {!tablet && <Button.Text>Dialogs</Button.Text>}
                        </Button>
                    </Item>
                    <Item to='/users'>
                        <Button type={'link'} size={'lg'}>
                            <Button.Icon><PeopleFill/></Button.Icon>
                            {!tablet && <Button.Text>Users</Button.Text> }
                        </Button>
                    </Item>
                    <Item to='/settings'>
                        <Button type={'link'} size={'lg'}>
                            <Button.Icon><GearWide/></Button.Icon>
                            {!tablet && <Button.Text>Settings</Button.Text> }
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