import React from 'react';
import classes from 'components/_forms/AddPostCommentForm/AddPostCommentForm.module.scss';
import { Form, FormRow } from 'components/_shared/Form/Form';
import { InputText } from 'components/_shared/Input/InputText/InputText';
import { Avatar } from 'components/_shared/Avatar/Avatar';
import { Button } from 'components/_shared/Button/Button';
import { NewCommentType } from 'types/types';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NavLink } from 'react-router-dom';

type PropsType = {
    disabled?: boolean,
    onAddComment: (text: string) => void
}

export const AddPostCommentForm: React.FC<PropsType> = ({ onAddComment, disabled = false }) => {
  const authorizedUser = useSelector((state: RootState) => state.auth.user);

  const submitHandler = (data: NewCommentType) => {
    onAddComment(data.text);
  };

  return (
    <Form onSubmit={submitHandler} initialValues={{ text: '' }} resetAfterSubmit>
      <FormRow>
        <div className={classes.avatar}>
          <NavLink to={`/profile/${authorizedUser?.username}`} tabIndex={disabled ? -1 : undefined}>
            <Avatar smallImg={authorizedUser?.avatar.small} size={30} />
          </NavLink>
        </div>
        <InputText name="text" placeholder="Write a comment" disabled={disabled} />
        <Button disabled={disabled} submit><Button.Text>Add</Button.Text></Button>
      </FormRow>
    </Form>
  );
};
