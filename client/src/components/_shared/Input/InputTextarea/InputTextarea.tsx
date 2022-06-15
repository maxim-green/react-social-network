import { Controller, RegisterOptions } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import React from 'react';
import { Item } from 'components/_shared/Form/Form';
import classes from './InputTextarea.module.scss';

export type InputTextareaPropsType = {
    name: string,
    label?: string,
    placeholder?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}
export const InputTextarea: React.FC<InputTextareaPropsType> = ({
  name,
  label,
  rules,
  control,
  rows = 2,
  disabled = false,
  placeholder,
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field, fieldState }) => (
      <Item
        label={label}
        required={!!rules?.required}
        error={fieldState.error}
        disabled={disabled}
      >
        <textarea
          className={`${classes.textarea} ${fieldState.error ? classes.error : ''}`}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
        />
      </Item>
    )}
  />
);
