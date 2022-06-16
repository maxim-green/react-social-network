import React from 'react';
import classes from 'components/Post/PostComments/PostComment/PostComment.module.scss';
import { CommentType } from 'types/types';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'components/_shared/Avatar/Avatar';
import { formatDate } from 'utils/functions';
import { Col, Row, Space } from 'components/_shared/Flex/Flex';
import { DeleteButton } from 'components/_shared/Button/DeleteButton/DeleteButton';

type PropsType = CommentType & {
  disabled: boolean,
  authorizedUserId?: string
  onDelete: (commentId: string) => void
}

export const PostComment: React.FC<PropsType> = ({
  _id,
  author,
  text,
  createdAt,
  authorizedUserId,
  onDelete,
  disabled = false,
}) => {
  const deleteHandler = () => {
    onDelete(_id);
  };

  const isAuthor = authorizedUserId === author._id;

  return (
    <Row padding="10px 10px" verticalAlign="start" gap={10} bordered>
      <NavLink to={`/profile/${author.username}`} tabIndex={disabled ? -1 : undefined}>
        <Avatar smallImg={author.avatar.small} size={30} />
      </NavLink>
      <Col gap={2}>
        <NavLink to={`/profile/${author.username}`} tabIndex={disabled ? -1 : undefined}>
          <div className={classes.author}>
            {author.firstName}
            {' '}
            {author.lastName}
          </div>
        </NavLink>
        <div className={classes.date}>{formatDate(createdAt)}</div>
        <div className={classes.text}>
          {text}
        </div>
      </Col>
      <Space />
      <Col>
        <Row>
          {isAuthor && (
            <DeleteButton
              onDelete={deleteHandler}
              warningMessage="Are you sure you want to delete comment?"
              disabled={disabled}
            />
          )}
        </Row>
      </Col>
    </Row>
  );
};
