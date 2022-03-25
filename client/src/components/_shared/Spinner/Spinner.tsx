import React from 'react'
import classes from './Spinner.module.scss'

type PropsType = {
    size?: number
    color?: string
    thickness?: number
    fullscreen?: boolean
}
const Spinner: React.FC<PropsType> = ({
                                          size = 20,
                                          color = '#00BFFF',
                                          thickness = 2,
    fullscreen= false
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
        <div className={fullscreen ? classes.fullscreen : ''}>
            <div className={classes.spinner} style={style}/>
        </div>
    )
}

export default Spinner