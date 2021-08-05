import classes from "./SearchInput.module.scss";
import React from "react";


const SearchInput = (props) => {
    return (
        <div className={classes.searchInput} >
            <button><img src={props.icon} alt="Search"/></button>
            <input className={classes.searchInput} type="text" placeholder="Search..."/>
        </div>
    )
}

export default SearchInput