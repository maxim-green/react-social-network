import React from 'react'
import classes from './Form.module.scss'
import classnames from 'classnames'

type PropsType = {padding?: boolean}

const Form: React.FC<PropsType & { onSubmit: (e: React.FormEvent) => void }> & {
    Row: React.FC
    Item: React.FC
    Error: React.FC
    Success: React.FC
    Title: React.FC
} = ({children, onSubmit, padding= true}) => {
    return (
        <form className={classnames(
            classes.form,
            {[classes.padding]: padding}
        )} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

Form.Row = ({children}) => {
    return (
        <div className={classes.row}>
            {children}
        </div>
    )
}

Form.Item = ({children}) => {
    return (
        <div className={classes.item}>
            {children}
        </div>
    )
}

Form.Error = ({children}) => {
    return (
        <Form.Row>
            <span className={classes.error}>{children}</span>
        </Form.Row>
    )
}

Form.Success = ({children}) => {
    return (
        <Form.Row>
            <span className={classes.success}>{children}</span>
        </Form.Row>
    )
}

Form.Title = ({children}) => {
    return (
        <Form.Row>
            <div className={classes.title}>{children}</div>
        </Form.Row>
    )
}

export default Form