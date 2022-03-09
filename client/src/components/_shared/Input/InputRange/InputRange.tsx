import {Controller, RegisterOptions} from 'react-hook-form'
import {Control} from 'react-hook-form/dist/types/form'
import React from 'react'
import classes from 'components/_shared/Form/Form.module.scss'
import Slider from 'rc-slider'
import {Item} from 'components/_shared/Form/Form'

type InputRangePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}
export const InputRange: React.FC<InputRangePropsType> = ({
                                                              name,
                                                              label,
                                                              rules,
                                                              control,
                                                              rows = 2,
                                                              disabled = false
                                                          }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <div className={classes.inputRange}>
                <Slider value={field.value} onChange={field.onChange}/>
            </div>
        </Item>}
    />
}