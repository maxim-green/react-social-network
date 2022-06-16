import React, { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { authActions, AuthActionType, register } from 'store/reducers/auth.reducer';
import { RegistrationDataType } from 'api/auth.api';
import { Button } from 'components/_shared/Button/Button';
import { Form, FormRow } from 'components/_shared/Form/Form';
import { InputText } from 'components/_shared/Input/InputText/InputText';
import { InputPassword } from 'components/_shared/Input/InputPassword/InputPassword';
import colors from 'assets/styles/colors.module.scss';

export const RegistrationForm: React.FC = () => {
  const { setRegistrationSuccessful } = authActions;
  const registrationSuccessful = useSelector(
    (state: RootState) => state.auth.registrationSuccessful,
  );
  const registrationErrors = useSelector((state: RootState) => state.auth.registrationErrors);
  const dispatch: ThunkDispatch<
    RootState,
    RegistrationDataType | boolean,
    AuthActionType
    > = useDispatch();

  const onSubmit = async (registrationFormData: RegistrationDataType) => {
    dispatch(register(registrationFormData));
  };

  useEffect(() => {
    dispatch(setRegistrationSuccessful(false));
  }, [dispatch]);

  return (
    <Form onSubmit={onSubmit} errors={registrationErrors}>
      {registrationSuccessful && (
        <FormRow>
          <div style={{ fontSize: 18, color: colors.success }}>
            Registration Successful!
          </div>
        </FormRow>
      )}
      <FormRow>
        <InputText name="firstName" label="First name" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <InputText name="lastName" label="Last name" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <InputText name="username" label="Username" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <InputText name="email" label="E-mail name" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <InputPassword name="password" label="Password" rules={{ required: true }} />
      </FormRow>
      <FormRow>
        <Button size="lg" submit>
          <Button.Text>Register</Button.Text>
        </Button>
      </FormRow>
    </Form>
  );
};
