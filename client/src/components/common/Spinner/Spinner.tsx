import React from 'react'
import spinnerImg from '../../../assets/images/spinner.svg'
import classes from './Spinner.module.scss'

const Spinner: React.FC = (props) => {
    return (
        <div className={classes.spinner}>
            <img src={spinnerImg} alt="Loading..."/>
        </div>
    )
}

export default Spinner