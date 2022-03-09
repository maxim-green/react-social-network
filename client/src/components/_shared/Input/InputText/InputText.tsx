import {Controller, RegisterOptions} from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types/form'
import React from 'react'
import classes from './InputText.module.scss'
import {Item} from 'components/_shared/Form/Form'

type InputTextPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    disabled?: boolean
    autoFocus?: boolean
}
export const InputText: React.FC<InputTextPropsType> = ({
                                                            name,
                                                            label,
                                                            rules,
                                                            control,
                                                            disabled = false,
                                                            autoFocus = false
                                                        }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <input
                type={'text'}
                className={`${classes.input} ${fieldState.error ? classes.error : ''}`}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                autoFocus={autoFocus}
            />
        </Item>}
    />
}