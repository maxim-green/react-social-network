import React from 'react'
import classes from './PostHeader.module.scss'
import {UserItemDataType} from 'types/types'
import {NavLink} from 'react-router-dom'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'
import {DeleteButton} from 'components/_shared/Button/DeleteButton/DeleteButton'
import {Button} from '../../_shared/Button/Button'
import {PencilFill} from 'react-bootstrap-icons'
import colors from '../../../assets/styles/colors.module.scss'
import {checkOnline} from 'utils/functions'

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
            <Avatar smallImg={author.avatar.small} online={checkOnline(author.updatedAt)} size={50}/>
        </NavLink>
        <Col verticalAlign={'center'}>
            <NavLink to={`/profile/${author.username}`}>
                <div className={classes.userName}>{author.firstName + ' ' + author.lastName}</div>
            </NavLink>
            <NavLink to={`/post/${id}`}>
                <div className={classes.date}>posted on {date}</div>
            </NavLink>
        </Col>
        <Space/>
        {isAuthor && <Col>
            <Row>
                <Button type="text" size="sm">
                    <Button.Icon><PencilFill color={colors.textMid} size={16}/></Button.Icon>
                </Button>
                <DeleteButton
                    onDelete={onDelete}
                    warningMessage={'Are you sure you want to delete this post?'}
                />
            </Row>
        </Col>}
    </Row>
}
