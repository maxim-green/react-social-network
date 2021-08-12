import React from 'react'
import {NavLink} from 'react-router-dom'

type PropsType = {
    src: string
}


const Logo: React.FC<PropsType> = ({src}) => {
    return (
        <NavLink to='/'>
            <img src={src} alt="Bind"/>
        </NavLink>
    )
}

export default Logo