import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/store';
import { EditProfileDataType } from 'api/profile.api';
import { ProfileActionType, updateProfile } from 'store/reducers/profile.reducer';
import { Spinner } from 'components/_shared/Spinner/Spinner';
import { Button } from 'components/_shared/Button/Button';
import { Form, FormRow, FormSection } from 'components/_shared/Form/Form';
import { InputText } from 'components/_shared/Input/InputText/InputText';
import { InputDate } from 'components/_shared/Input/InputDate/InputDate';
import { InputTextarea } from 'components/_shared/Input/InputTextarea/InputTextarea';
import { Row } from 'components/_shared/Flex/Flex';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import { useAuth } from 'hooks/useAuth';
import sizes from '../../assets/styles/sizes.module.scss';

type PropsType = {
  initialValues: EditProfileDataType
  onSubmit: (profileData: EditProfileDataType) => void
  closeModal?: () => void
}

const EditProfileForm: React.FC<PropsType> = ({ initialValues, onSubmit, closeModal }) => {
  const { height: windowHeight } = useWindowDimensions();
  const viewPortHeight = windowHeight - Number(sizes.appBarHeight) - Number(sizes.bottomNavHeight);
  const formInputsSectionHeight = viewPortHeight < 600 ? viewPortHeight : 600;

  const submit = (data: EditProfileDataType) => {
    onSubmit(data);
    if (closeModal) closeModal();
  };

  const backButtonClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (closeModal) closeModal();
  };

  return (
    <Form onSubmit={submit} initialValues={initialValues}>
      <div style={{ background: 'white', paddingBottom: 5 }}>
        <Row horizontalAlign="space-between">
          <Button size="md">
            <Button.Text>
              Save
            </Button.Text>
          </Button>
          <div style={{ marginLeft: 'auto' }}>
            <Button onClick={backButtonClickHandler} size="md" type="cancel">
              <Button.Text>
                Cancel
              </Button.Text>
            </Button>
          </div>
        </Row>
      </div>
      <FormSection height={formInputsSectionHeight}>
        <FormRow>
          <InputText name="firstName" label="First name" rules={{ required: true }} />
        </FormRow>
        <FormRow>
          <InputText name="lastName" label="Last name" rules={{ required: true }} />
        </FormRow>
        <FormRow>
          <InputDate name="birthDate" label="Birth date" />
        </FormRow>
        <FormRow>
          <InputText name="location.country" label="Country" />
          <InputText name="location.city" label="City" />
        </FormRow>
        <FormRow>
          <InputTextarea name="bio" label="Bio" rows={5} />
        </FormRow>
        <FormRow>
          <InputText name="contacts.website" label="Website" />
        </FormRow>
        <FormRow>
          <InputText name="contacts.vkontakte" label="Vkontakte" />
        </FormRow>
        <FormRow>
          <InputText name="contacts.github" label="Github" />
        </FormRow>
      </FormSection>
    </Form>
  );
};

export const EditProfileFormContainer: React.FC<{ closeModal?: () => void }> = ({ closeModal }) => {
  const editProfileData: EditProfileDataType = useSelector((state: RootState) => ({
    firstName: state.profile.user?.firstName,
    lastName: state.profile.user?.lastName,
    birthDate: state.profile.user?.birthDate,
    bio: state.profile.user?.bio,
    location: state.profile.user?.location,
    contacts: state.profile.user?.contacts,
  }));
  const dispatch: ThunkDispatch<RootState, EditProfileDataType, ProfileActionType> = useDispatch();

  useAuth();

  const onSubmit = (profileData: EditProfileDataType) => {
    dispatch(updateProfile(profileData));
  };

  if (!editProfileData) return <Spinner />;

  return (
    <EditProfileForm
      closeModal={closeModal}
      initialValues={editProfileData}
      onSubmit={onSubmit}
    />
  );
};
