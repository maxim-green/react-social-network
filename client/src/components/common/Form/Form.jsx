import React from 'react'
import classes from './Form.module.scss'

const Form = ({children, onSubmit}) => {
    return(
        <form className={classes.form} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

const Row = ({children}) => {
    return (
        <div className={classes.row}>
            {children}
        </div>
    )
}

const Item = ({children}) => {
    return (
        <div className={classes.item}>
            {children}
        </div>
    )
}

const Error = ({children}) => {
    return (
        <Row>
            <span className={classes.error}>{children}</span>
        </Row>
    )
}

const Success = ({children}) => {
    return (
        <Row>
            <span className={classes.success}>{children}</span>
        </Row>
    )
}

const Title = ({children}) => {
    return (
        <Row>
            <div className={classes.title}>{children}</div>
        </Row>
    )
}

Form.Row = Row
Form.Item = Item
Form.Error = Error
Form.Success = Success
Form.Title = Title
export default Form