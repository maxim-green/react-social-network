import React from 'react';
import { login, AuthActionType } from 'store/reducers/auth.reducer';
import { LoginDataType } from 'api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/store';
import { Button } from 'components/_shared/Button/Button';
import { Form, FormRow } from 'components/_shared/Form/Form';
import { InputText } from 'components/_shared/Input/InputText/InputText';
import { InputPassword } from 'components/_shared/Input/InputPassword/InputPassword';
import { InputCheckbox } from 'components/_shared/Input/InputCheckbox/InputCheckbox';

export const LoginForm: React.FC = () => {
  const errors = useSelector((state: RootState) => state.auth.loginErrors);
  const dispatch: ThunkDispatch<RootState, LoginDataType, AuthActionType> = useDispatch();

  const onSubmit = (loginFormData: LoginDataType) => {
    dispatch(login(loginFormData));
  };

  return (
    <Form onSubmit={onSubmit} errors={errors}>
      <FormRow>
        <InputText name="email" label="E-mail" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <InputPassword name="password" label="Password" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <InputCheckbox name="rememberMe" label="Remember me" />
      </FormRow>
      <FormRow>
        <Button type="primary" size="lg" submit>
          <Button.Text>Log in</Button.Text>
        </Button>
      </FormRow>
    </Form>
  );
};
