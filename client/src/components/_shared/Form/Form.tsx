import React, { useEffect, useState } from 'react';
import classes from 'components/_shared/Form/Form.module.scss';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldError } from 'react-hook-form/dist/types';
import { ServerValidationErrorType } from 'types/types';

type FormPropsType = {
  onSubmit: (data: any) => void
  initialValues?: { [key: string]: any }
  errors?: Array<ServerValidationErrorType>
  resetAfterSubmit?: boolean
  submitOnBlur?: boolean
  submitOnEnter?: boolean
}
type RowPropsType = {
  control?: Control,
  align?: 'fill' | 'left' | 'right' | 'center'
}
type SectionPropsType = {
  control?: Control,
  height?: number | string,
}
type ItemPropsType = {
  label?: string,
  labelPosition?: 'top' | 'left' | 'right'
  required?: boolean,
  disabled?: boolean,
  error?: FieldError,
}

export const FormSection: React.FC<SectionPropsType> = ({
  children,
  control,
  height,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { control });
    }
    return child;
  });

  return (
    <div
      className={classnames(
        classes.section,
      )}
      style={{ height }}
    >
      {childrenWithProps}
    </div>
  );
};

export const FormRow: React.FC<RowPropsType> = ({
  children,
  control,
  align = 'fill',
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { control, align });
    }
    return child;
  });

  return (
    <div className={classnames(
      classes.row,
      { [classes[align]]: align },
    )}
    >
      {childrenWithProps}
    </div>
  );
};

export const Item: React.FC<ItemPropsType> = ({
  children,
  label,
  labelPosition = 'top',
  required = false,
  disabled = false,
  error,
}) => (
  <label className={classnames(classes.item, { [classes[labelPosition]]: labelPosition })}>
    <div className={classnames(classes.label, { [classes.disabled]: disabled })}>
      {required && <span className={classes.labelRequired}>*</span>}
      <span className={classes.labelText}>{label}</span>
      {error?.type === 'required'
        && <span className={classes.formItemError}>This field is required</span>}
      {error?.type === 'server' && <span className={classes.formItemError}>{error.message}</span>}
    </div>
    {children}
  </label>
);

export const Form: React.FC<FormPropsType> = ({
  onSubmit,
  children,
  initialValues,
  errors = [],
  submitOnBlur = false,
  submitOnEnter = false,
  resetAfterSubmit = false,
}) => {
  const {
    control, handleSubmit, reset, setError, watch, setValue,
  } = useForm({
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const [formError, setFormError] = useState<ServerValidationErrorType | null>(null);
  useEffect(() => {
    setFormError(errors.find((error) => error.field === 'form') || null);
    errors.forEach(({ field, message }) => setError(field, { type: 'server', message }));
  }, [errors, setError]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { control });
    }
    return child;
  });

  const submit = (data: { [key: string]: any }) => {
    onSubmit(data);
    if (resetAfterSubmit) reset();
  };

  const onBlurHandler = () => {
    if (submitOnBlur) handleSubmit(submit)();
  };

  const onKeyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      if (submitOnEnter && e.ctrlKey) {
        const elementName = e.target.name;
        const elementValue = watch(elementName);
        setValue(elementName, `${elementValue}\n`);
      }

      if (submitOnEnter && !e.ctrlKey) {
        e.preventDefault();
        handleSubmit(submit)();
      }
    }
  };

  return (
    <form
      className={classes.wrapper}
      onSubmit={handleSubmit(submit)}
      onBlur={onBlurHandler}
    >
      <div
        role="presentation"
        onKeyDown={onKeyDownHandler}
      >
        {formError
          && (
            <FormRow>
              <span className={classes.formError}>
                {formError.message}
              </span>
            </FormRow>
          )}
        {childrenWithProps}
      </div>
    </form>
  );
};
