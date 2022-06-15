import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

import { Controller, RegisterOptions } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Item } from 'components/_shared/Form/Form';
import classes from './InputDate.module.scss';

type CustomDatePickerType = { value: Date, onChange: (date: Date) => void }
const CustomDatePicker: React.FC<CustomDatePickerType> = ({ value, onChange }) => {
  const [date, setDate] = useState<Date>(value ? new Date(value) : new Date());
  const changeHandler = (newDate: Date) => {
    onChange(newDate);
    setDate(newDate);
  };

  return <DatePicker dateFormat="dd.MM.yyyy" calendarStartDay={1} selected={date} onChange={changeHandler} />;
};
type InputDatePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    disabled?: boolean
}
export const InputDate: React.FC<InputDatePropsType> = ({
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
        <div className={classes.input}>
          <CustomDatePicker value={field.value} onChange={field.onChange} />
        </div>
      </Item>
    )}
  />
);
