import React from 'react'
import classes from './IconWithCounter.module.scss'

type PropsType = {
    src: string
    alt: string
    count: number
}

const IconWithCounter: React.FC<PropsType> = ({
                                                  src,
                                                  alt,
                                                  count
                                              }) => {
    return (
        <div className={classes.IconWithCounter}>
            <img src={src} alt={alt}/>
            {(count > 0) && <div className={classes.counter}>{count}</div>}
        </div>
    )
}

export default IconWithCounter