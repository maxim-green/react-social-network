import React, {useState} from 'react'
import classes from './PostComment.module.scss'
import {CommentType} from 'types/types'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {formatDate} from 'utils/functions'
import {Button} from 'components/_shared/Button/Button'
import {Heart, TrashFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import {ConfirmPopup} from 'components/_shared/ConfirmPopup/ConfirmPopup'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'

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
                                                     likes,
                                                     authorizedUserId,
                                                     onDelete,
                                                     disabled = false
                                                 }) => {
    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const deleteHandler = () => {
        onDelete(_id)
        setOpen(false)
    }

    const isAuthor = authorizedUserId === author._id

    return <div className={classes.comment}>
        <Row padding={'10px 20px'} verticalAlign={'center'} gap={10}>
            <NavLink to={`/profile/${author.username}`} tabIndex={disabled ? -1 : undefined}>
                <Avatar smallImg={author.avatar.small} size={40}/>
            </NavLink>
            <Col gap={2}>
                <NavLink to={`/profile/${author.username}`} tabIndex={disabled ? -1 : undefined}>
                    <div className={classes.author}>{author.firstName} {author.lastName}</div>
                </NavLink>
                <div className={classes.date}>{formatDate(createdAt)}</div>
            </Col>
            <div className={classes.text}>
                {text}
            </div>
            <Space/>
            <Col>
                <Row>
                    <Button type="text" size="sm" disabled={disabled}>
                        <Button.Icon><Heart color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                    {isAuthor && <Button type="text" size="sm" onClick={openModal} disabled={disabled}>
                        <Button.Icon>
                            <TrashFill color={colors.midGrey1} size={16}/>
                        </Button.Icon>
                    </Button>}
                </Row>
            </Col>
        </Row>

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