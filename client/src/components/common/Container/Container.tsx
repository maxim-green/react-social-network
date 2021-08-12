import classes from './Container.module.scss'
import React from 'react'

type PropsType = {}

const Container: React.FC<PropsType> = ({children}) => <div className={classes.container}>
    {children}
</div>

export default Container