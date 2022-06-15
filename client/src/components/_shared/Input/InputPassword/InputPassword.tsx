import React from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { Item } from 'components/_shared/Form/Form';
import classes from './InputPassword.module.scss';

type InputPasswordPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    disabled?: boolean
}
export const InputPassword: React.FC<InputPasswordPropsType> = ({
  name,
  label,
  rules,
  control,
  disabled = false,
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
        <input
          type="password"
          className={`${classes.input} ${fieldState.error ? classes.error : ''}`}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          disabled={disabled}
        />
      </Item>
    )}
  />
);
