import React, {useState} from 'react'
import classes from 'components/Post/PostComments/PostComment/PostComment.module.scss'
import {CommentType} from 'types/types'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {formatDate} from 'utils/functions'
import {Button} from 'components/_shared/Button/Button'
import {Heart, PencilFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'
import {DeleteButton} from 'components/_shared/Button/DeleteButton/DeleteButton'

type PropsType = CommentType & {
    disabled: boolean,
    authorizedUserId?: string
    onDelete: (commentId: string) => void
}

// todo connect to store here
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
                    <Button type="text" size="sm" disabled={disabled}>
                        <Button.Icon><PencilFill color={colors.textMid} size={16}/></Button.Icon>
                    </Button>
                    {isAuthor && <DeleteButton
                        onDelete={deleteHandler}
                        warningMessage={'Are you sure you want to delete comment?'}
                    />}
                </Row>
            </Col>
        </Row>
    </div>
}