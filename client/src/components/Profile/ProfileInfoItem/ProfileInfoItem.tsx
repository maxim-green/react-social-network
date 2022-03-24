import classes from 'components/Profile/ProfileInfoItem/ProfileInfoItem.module.scss'
import React from 'react'
import {Icon} from 'react-bootstrap-icons'

type PropsType = {
    Icon?: Icon
    value: string
}

const ProfileInfoItem: React.FC<PropsType> = ({
                                                  value,
                                                  children,
                                                  Icon
                                              }) => {
    return (
        <div className={classes.wrapper}>
            {Icon && <div className={classes.icon}><Icon size={18}/></div>}
            <div className={classes.value}>{value}</div>
        </div>
    )
}

export default ProfileInfoItem