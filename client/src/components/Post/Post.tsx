import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ChatSquareTextFill, Heart, HeartFill, ShareFill, TrashFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import classes from './Post.module.scss'
import {Card} from 'components/_shared/Card/Card'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Button} from 'components/_shared/Button/Button'
import {ConfirmPopup} from 'components/_shared/ConfirmPopup/ConfirmPopup'
import {PostType} from 'types/types'
import moment from 'moment'

type PropsType = {
    post: PostType
    onPostAddLike: (id: string) => void
    onPostDeleteLike: (id: string) => void
    onPostDelete: (id: string) => void
    authorizedUserId?: string
}

const Post: React.FC<PropsType> = ({
                                       post,
                                       onPostDelete,
                                       onPostAddLike,
                                       onPostDeleteLike,
                                       authorizedUserId
                                   }) => {
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const isAuthor = authorizedUserId === post.author._id
    const fullName = post.author.firstName + ' ' + post.author.lastName
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

    return (
        <Card>
            <div className={classes.header}>
                <div className={classes.avatar}>
                    <NavLink to="/profile/1"><Avatar smallImg={post.author.avatar.small} online
                                                     size={50}/></NavLink>
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
                    <Button type="text" size="sm">
                        <Button.Icon><ChatSquareTextFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                </div>
                <div className={classes.controlsItem}>
                    <Button type="text" size="sm">
                        <Button.Icon><ShareFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default Post