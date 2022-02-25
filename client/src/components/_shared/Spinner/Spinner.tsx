import React from 'react'
import classes from './Spinner.module.scss'

type PropsType = {
    size?: number
    color?: string
    thickness?: number
}
const Spinner: React.FC<PropsType> = ({
                                          size = 20,
                                          color = '#00BFFF',
                                          thickness = 2
                                      }) => {
    const style = {
        width: size,
        height: size,
        borderWidth: thickness,
        borderLeftColor: color,
        borderBottomColor: color,
        borderRightColor: color
    }

    return (
        <div className={classes.wrapper} style={style}/>
    )
}

export default Spinner