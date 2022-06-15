import React from 'react';
import { Button } from 'components/_shared/Button/Button';
import { Form, FormRow } from 'components/_shared/Form/Form';
import { InputTextarea } from 'components/_shared/Input/InputTextarea/InputTextarea';
import classes from './NewMessageForm.module.scss';

type PropsType = {
    onSubmit: (message: string) => void
}

export const NewMessageForm: React.FC<PropsType> = ({ onSubmit }) => {
  const submit = (data: { newMessageInput: string }) => {
    onSubmit(data.newMessageInput);
  };

  return (
    <Form onSubmit={submit} initialValues={{ newMessageInput: '' }} resetAfterSubmit submitOnEnter>
      <FormRow>
        <InputTextarea name="newMessageInput" />
        <div className={classes.button}>
          <Button>Send</Button>
        </div>
      </FormRow>
    </Form>
  );
};
