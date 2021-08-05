import React from "react";
import {NavLink} from "react-router-dom";


const Logo = (props) => {
    return (
        <NavLink to='/'>
            <img src={props.src} alt="Bind"/>
        </NavLink>
    )
}

export default Logo