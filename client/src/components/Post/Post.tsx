import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ChatSquareTextFill, Heart, HeartFill, ShareFill, TrashFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import classes from './Post.module.scss'
import classnames from 'classnames'
import {Card} from 'components/_shared/Card/Card'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Button} from 'components/_shared/Button/Button'
import {ConfirmPopup} from 'components/_shared/ConfirmPopup/ConfirmPopup'
import {CommentType, PostType} from 'types/types'
import AddPostCommentForm from 'components/_forms/AddPostCommentForm/AddPostCommentForm'
import {formatDate} from 'utils/functions'
import {PostComment} from 'components/Post/PostComment/PostComment'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'

// todo: destructure this component; consider connecting to store here.
type PropsType = {
    post: PostType
    onPostAddLike: (id: string) => void
    onPostDeleteLike: (id: string) => void
    onPostDelete: (id: string) => void
    authorizedUserId?: string
    onAddComment: (postId: string, text: string) => void
    onDeleteComment: (commentId: string) => void
}

const Post: React.FC<PropsType> = ({
                                       post,
                                       onPostDelete,
                                       onPostAddLike,
                                       onPostDeleteLike,
                                       authorizedUserId,
                                       onAddComment,
                                       onDeleteComment
                                   }) => {
    const [commentSectionActive, setCommentSectionActive] = useState(false)
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const isAuthor = authorizedUserId === post.author._id
    const fullName = post.author.firstName + ' ' + post.author.lastName
    const date = formatDate(post.createdAt)
    const isLiked = authorizedUserId ? post.likes.map(user => user._id).includes(authorizedUserId) : false

    const onDeleteClickHandler = () => {
        if (onPostDelete) onPostDelete(post._id)
    }

    const onAddLikeClickHandler = () => {
        if (onPostAddLike) onPostAddLike(post._id)
    }

    const onDeleteLikeClickHandler = () => {
        if (onPostDeleteLike) onPostDeleteLike(post._id)
    }

    const addCommentHandler = (text: string) => {
        onAddComment(post._id, text)
    }

    const deleteCommentHandler = (commentId: string) => {
        onDeleteComment(commentId)
    }

    const toggleCommentSection = () => {
        commentSectionActive ? setCommentSectionActive(false) : setCommentSectionActive(true)
    }

    return (
        <Card>
            <Row padding={20} gap={20}>
                <NavLink to={`/profile/${post.author.username}`}>
                    <Avatar smallImg={post.author.avatar.small} online size={50}/>
                </NavLink>
                <Col verticalAlign={'center'}>
                    <NavLink to="/">
                        <div className={classes.userName}>{fullName}</div>
                    </NavLink>
                    <NavLink to={`/post/${post._id}`}>
                        <div className={classes.date}>posted on {date}</div>
                    </NavLink>
                </Col>
                <Space/>
                {isAuthor && onPostDelete && <div>
                    <Button onClick={openModal} type="text" size="sm">
                        <Button.Icon>
                            <TrashFill color={colors.midGrey1} size={16}/>
                        </Button.Icon>
                    </Button>
                    <ConfirmPopup
                        open={open}
                        onConfirm={onDeleteClickHandler}
                        onDecline={closeModal}
                        important
                    >
                        Are you sure you want to delete this post?
                    </ConfirmPopup>
                </div>}
            </Row>

            <div className={classes.content}>
                <div className={classes.text}>
                    {post.text}
                </div>
            </div>

            <div className={classes.controls}>
                <div className={classes.controlsItem}>
                    <div>{post.likes.length}</div>
                    {!isLiked && <Button type="text" size="sm" onClick={onAddLikeClickHandler}>
                        <Button.Icon><Heart color={colors.accent} size={16}/></Button.Icon>
                    </Button>}
                    {isLiked && <Button type="text" size="sm" onClick={onDeleteLikeClickHandler}>
                        <Button.Icon><HeartFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>}
                </div>
                <div className={classes.controlsItem}>
                    <Button type="text" size="sm" onClick={toggleCommentSection}>
                        <Button.Icon><ChatSquareTextFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                </div>
                <div className={classes.controlsItem}>
                    <Button type="text" size="sm">
                        <Button.Icon><ShareFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                </div>
            </div>

            <div className={classnames(
                classes.comments,
                {[classes.active]: commentSectionActive}
            )}>
                <div className={classes.commentInput}>
                    <AddPostCommentForm onAddComment={addCommentHandler} disabled={!commentSectionActive}/>
                </div>

                {!!post.comments.length && <div className={classes.commentsList}>

                    {post.comments.slice().reverse().map(comment => <PostComment key={comment._id} {...comment}
                                                                                 authorizedUserId={authorizedUserId}
                                                                                 onDelete={deleteCommentHandler}
                                                                                 disabled={!commentSectionActive}
                    />)}

                    {post.comments.length > 3 && <div className={classes.commentsShowMore}>
                        <NavLink to={`/post/${post._id}`} tabIndex={!commentSectionActive ? -1 : undefined}>
                            <Button type={'link'} disabled={!commentSectionActive}><Button.Text>Show more</Button.Text></Button>
                        </NavLink>
                    </div>}
                </div>}

            </div>
        </Card>
    )
}


export default Post