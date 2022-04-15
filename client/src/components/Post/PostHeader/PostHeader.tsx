import React from 'react'
import classes from './PostHeader.module.scss'
import {UserItemDataType} from 'types/types'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'
import {DeleteButton} from 'components/_shared/Button/DeleteButton/DeleteButton'

type PropsType = {
    id: string
    date: string
    author: UserItemDataType
    isAuthor: boolean
    onDelete: () => void
}
export const PostHeader: React.FC<PropsType> = ({
                                                  id,
                                                  date,
                                                  author,
                                                  isAuthor,
                                                  onDelete
                                              }) => {
    return <Row padding={20} gap={20}>
        <NavLink to={`/profile/${author.username}`}>
            <Avatar smallImg={author.avatar.small} online size={50}/>
        </NavLink>
        <Col verticalAlign={'center'}>
            <NavLink to="/">
                <div className={classes.userName}>{author.firstName + ' ' + author.lastName}</div>
            </NavLink>
            <NavLink to={`/post/${id}`}>
                <div className={classes.date}>posted on {date}</div>
            </NavLink>
        </Col>
        <Space/>
        {isAuthor && onDelete && <DeleteButton
            onDelete={onDelete}
            warningMessage={'Are you sure you want to delete this post?'}
        />}
    </Row>
}