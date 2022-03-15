import React from 'react'
import classes from './BottomNavigation.module.scss'
import colors from 'assets/styles/colors.module.scss'
import {Button} from 'components/_shared/Button/Button'
import {ChatLeftTextFill, GearWide, PeopleFill, PersonLinesFill} from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'

type Props = {
    avatar?: string
}

export const BottomNavigation: React.FC<Props> = ({avatar}) => {
    return <div className={classes.wrapper}>
        <div className={classes.item}>
            <NavLink to={'/users'}>
                <Button type={'link'} size={'large'}>
                    <Button.Icon><PeopleFill color={colors.fontLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to={'/dialogs'}>
                <Button type={'link'} size={'large'}>
                    <Button.Icon><ChatLeftTextFill color={colors.fontLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to={'/profile'}>
                <Button type={'link'} size={'large'}>
                    <Button.Icon><Avatar smallImg={avatar} size={24}/></Button.Icon>
                </Button>
            </NavLink>
        </div>
    </div>
}