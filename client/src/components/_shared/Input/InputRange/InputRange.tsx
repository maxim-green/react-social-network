import { Controller, RegisterOptions } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import React from 'react';
import 'rc-slider/assets/index.css';
import classes from 'components/_shared/Form/Form.module.scss';
import Slider from 'rc-slider';
import { Item } from 'components/_shared/Form/Form';

type InputRangePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
    min: number,
    max: number,
    step: 0.01
}
export const InputRange: React.FC<InputRangePropsType> = ({
  min = 1,
  max = 3,
  step = 0.01,
  name,
  label,
  rules,
  control,
  rows = 2,
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
        <div className={classes.inputRange}>
          <Slider
            value={field.value}
            min={1}
            max={3}
            step={0.01}
            onChange={field.onChange}
          />
        </div>
      </Item>
    )}
  />
);
