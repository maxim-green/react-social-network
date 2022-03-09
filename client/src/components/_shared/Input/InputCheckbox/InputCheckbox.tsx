import {Controller, RegisterOptions} from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types/form'
import React from 'react'
import classes from './InputCheckbox.module.scss'
import {Item} from 'components/_shared/Form/Form'

type CheckboxPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}

export const InputCheckbox: React.FC<CheckboxPropsType> = ({
                                                          name,
                                                          label,
                                                          rules,
                                                          control,
                                                          disabled = false
                                                      }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               labelPosition='right' disabled={disabled}>
            <div className={classes.checkbox}>
                <input
                    type="checkbox"
                    name={name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={disabled}
                />
                <span className={classes.box}/>
            </div>
        </Item>}
    />
}