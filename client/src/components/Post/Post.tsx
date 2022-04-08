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
import moment from 'moment'
import AddPostCommentForm from 'components/_forms/AddPostCommentForm/AddPostCommentForm'

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
    // todo: move next line to formatDate helper
    const date = moment(post.createdAt).format('DD.MM.YYYY')
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
            <div className={classes.header}>
                <div className={classes.avatar}>
                    <NavLink to={`/profile/${post.author.username}`}><Avatar smallImg={post.author.avatar.small} online
                                                     size={55}/></NavLink>
                </div>
                <div className={classes.info}>
                    <NavLink to="/">
                        <div className={classes.userName}>{fullName}</div>
                    </NavLink>
                    <NavLink to={`/post/${post._id}`}>
                        <div className={classes.date}>posted on {date}</div>
                    </NavLink>
                </div>
                <div className={classes.menu}>
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
                </div>
            </div>

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
                    <AddPostCommentForm onAddComment={addCommentHandler}/>
                </div>

                {!!post.comments.length && <div className={classes.commentsList}>

                    {post.comments.slice().reverse().map(comment => <Comment key={comment._id} {...comment}
                                                           authorizedUserId={authorizedUserId}
                                                           onDelete={deleteCommentHandler}
                    />)}

                    {post.comments.length > 3 && <div className={classes.commentsShowMore}>
                        <Button type={'link'}><Button.Text>Show more</Button.Text></Button>
                    </div>}
                </div>}

            </div>
        </Card>
    )
}

const Comment: React.FC<CommentType & {
    authorizedUserId?: string
    onDelete: (commentId: string) => void
}> = ({_id, author, text, createdAt, likes, authorizedUserId, onDelete}) => {
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const deleteHandler = () => {
        onDelete(_id)
        setOpen(false)
    }

    const isAuthor = authorizedUserId === author._id

    return <div className={classes.comment}>
        <div className={classes.commentAvatar}>
            <Avatar smallImg={author.avatar.small} size={40}/>
        </div>
        <div className={classes.commentContent}>
            <div className={classes.commentText}>
                <span className={classes.commentAuthor}>{author.firstName} {author.lastName}</span>
                {text}
            </div>
            <div className={classes.commentDate}>{moment(createdAt).format('DD.MM.YYYY')}</div>
        </div>
        <div className={classes.commentControls}>
            <Button type="text" size="sm">
                <Button.Icon><Heart color={colors.accent} size={16}/></Button.Icon>
            </Button>
            {isAuthor && <Button type="text" size="sm" onClick={openModal}>
                <Button.Icon>
                    <TrashFill color={colors.midGrey1} size={16}/>
                </Button.Icon>
            </Button>}
        </div>

        <ConfirmPopup
            open={open}
            onConfirm={deleteHandler}
            onDecline={closeModal}
            important
        >
            Are you sure you want to delete comment?
        </ConfirmPopup>
    </div>
}

export default Post