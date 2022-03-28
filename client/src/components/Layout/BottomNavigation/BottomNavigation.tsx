import React from 'react'
import classes from 'components/Layout/BottomNavigation/BottomNavigation.module.scss'
import colors from 'assets/styles/colors.module.scss'
import {Button} from 'components/_shared/Button/Button'
import {ChatLeftTextFill, PeopleFill, HouseDoorFill, DoorOpenFill} from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'

type Props = {
    authorized: boolean
    avatar?: string | null
}

export const BottomNavigation: React.FC<Props> = ({avatar, authorized}) => {
    return <div className={classes.wrapper}>
        {authorized && <div className={classes.item}>
            <NavLink to={'/feed'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><HouseDoorFill color={colors.fontLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>}
        <div className={classes.item}>
            <NavLink to={'/users'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><PeopleFill color={colors.fontLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>
        {authorized && <div className={classes.item}>
            <NavLink to={'/dialogs'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><ChatLeftTextFill color={colors.fontLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>}
        {authorized && <div className={classes.item}>
            <NavLink to={'/profile'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><Avatar smallImg={avatar} size={24}/></Button.Icon>
                </Button>
            </NavLink>
        </div>}
        {!authorized && <div className={classes.item}>
            <NavLink to={'/login'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><DoorOpenFill color={colors.fontLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>}
    </div>
}