import React from 'react'
import classes from 'components/Layout/BottomNavigation/BottomNavigation.module.scss'
import colors from 'assets/styles/colors.module.scss'
import {Button} from 'components/_shared/Button/Button'
import {ChatLeftTextFill, PeopleFill, HouseDoorFill, DoorOpenFill} from 'react-bootstrap-icons'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {useSelector} from 'react-redux'
import {RootState} from 'store/store'

type Props = {
    authorized: boolean
    avatar?: string | null
}

export const BottomNavigation: React.FC<Props> = ({avatar, authorized}) => {
    const unreadMessagesCount = useSelector((state: RootState) => state.dialogs.unreadMessagesCount)
    return <div className={classes.wrapper}>
        {authorized && <div className={classes.item}>
            <NavLink to={'/feed'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><HouseDoorFill color={colors.textLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>}
        <div className={classes.item}>
            <NavLink to={'/users'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><PeopleFill color={colors.textLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>
        {authorized && <div className={classes.item}>
            <NavLink to={'/dialogs'}>
                <Button type={'link'} size={'lg'}>
                    <Button.Icon><ChatLeftTextFill color={colors.textLight}/></Button.Icon>
                    {!!unreadMessagesCount && <Button.Badge>{unreadMessagesCount}</Button.Badge>}
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
                    <Button.Icon><DoorOpenFill color={colors.textLight}/></Button.Icon>
                </Button>
            </NavLink>
        </div>}
    </div>
}
