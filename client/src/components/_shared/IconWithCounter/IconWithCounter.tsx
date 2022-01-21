import React from 'react'
import classes from './IconWithCounter.module.scss'

type PropsType = {
    count: number
}

const IconWithCounter: React.FC<PropsType> = ({
                                                  count,
    children
                                              }) => {
    return (
        <div className={classes.IconWithCounter}>
            <div className={classes.icon}>{children}</div>
            {(count > 0) && <div className={classes.counter}>{count}</div>}
        </div>
    )
}

export default IconWithCounter