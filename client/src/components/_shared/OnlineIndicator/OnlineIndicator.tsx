import React from 'react'
import classes from './OnlineIndicator.module.scss'

type Props = {}

export const OnlineIndicator: React.FC<Props> = ({children}) => {
    return <div className={classes.onlineIndicator}>
        {children}
    </div>
}