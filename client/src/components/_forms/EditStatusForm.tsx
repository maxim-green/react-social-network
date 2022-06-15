import React from 'react';
import { Form } from 'components/_shared/Form/Form';
import { InputText } from 'components/_shared/Input/InputText/InputText';

type PropsType = {
  onSubmit: (data: { status: string }) => void
  initialStatus: string
}

export const EditStatusForm: React.FC<PropsType> = ({ onSubmit, initialStatus }) => (
  <Form onSubmit={onSubmit} submitOnBlur initialValues={{ status: initialStatus }} submitOnEnter>
    <InputText name="status" autoFocus />
  </Form>
);
