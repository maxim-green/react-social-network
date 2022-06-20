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
  closeModal?: () => void
}

export const EditProfileForm: React.FC<PropsType> = ({ closeModal }) => {
  const { height: windowHeight } = useWindowDimensions();
  const viewPortHeight = windowHeight - Number(sizes.appBarHeight) - Number(sizes.bottomNavHeight);
  const formInputsSectionHeight = viewPortHeight < 600 ? viewPortHeight : 600;

  const initialValues: EditProfileDataType = useSelector((state: RootState) => ({
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
    const normalizedProfileData: EditProfileDataType = {
      ...profileData,
      firstName: profileData.firstName.trim(),
      lastName: profileData.lastName.trim(),
      birthDate: profileData.birthDate?.trim() || null,
      bio: profileData.bio?.trim() || null,
      location: {
        country: profileData.location?.country?.trim() || '',
        city: profileData.location?.city?.trim() || '',
      },
      contacts: {
        website: profileData.contacts?.website?.trim() || '',
        github: profileData.contacts?.github?.trim() || '',
        vkontakte: profileData.contacts?.vkontakte?.trim() || '',
      },
    };
    dispatch(updateProfile(normalizedProfileData));
  };

  if (!initialValues) return <Spinner />;

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
          <Button size="md" submit>
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
