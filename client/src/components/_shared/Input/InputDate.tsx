import React, {useState} from 'react'
import classes from './Input.module.scss'
import DatePicker from 'react-datepicker'
import {InputPropsType} from '../Form/Form'

export const InputDate: React.FC<InputPropsType<Date>> = React.forwardRef<HTMLInputElement, InputPropsType<Date>>(({
                                                                                                                       name,
                                                                                                                       value,
                                                                                                                       required = false,
                                                                                                                       disabled = false,
                                                                                                                       onChange,
                                                                                                                       onBlur
                                                                                                                   }, ref) => {
    const [date, setDate] = useState<Date>(value ? new Date(value) : new Date())
    const changeHandler = (date: Date) => {
        onChange && onChange(date)
        setDate(date)
    }
    return (
        <div className={classes.input}>
            <DatePicker calendarStartDay={1} selected={date} onChange={changeHandler}/>
        </div>
    )
})