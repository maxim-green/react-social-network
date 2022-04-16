import React from 'react'
import classes from './PostControls.module.scss'
import {Button} from 'components/_shared/Button/Button'
import {ChatSquareTextFill, Heart, HeartFill, ShareFill} from 'react-bootstrap-icons'
import colors from 'assets/styles/colors.module.scss'
import {UserItemDataType} from 'types/types'
import {Col, Row} from '../../_shared/Flex/Flex'

type PropsType = {
    likes: UserItemDataType[]
    isLiked: boolean,
    onLikeClick: () => void
    onCommentClick: () => void
    onShareClick: () => void
}

export const PostControls: React.FC<PropsType> = ({
    likes,
    isLiked,
    onLikeClick,
    onCommentClick,
    onShareClick
                                                  }) => {
    return <Row verticalAlign={'center'}>
        <Col bordered={true} padding={5} horizontalAlign={'center'} stretch>
            <Button type="text" size="sm" onClick={onLikeClick}>
                <Button.Text>{likes.length}</Button.Text>
                {!isLiked && <Button.Icon><Heart color={colors.accent} size={16}/></Button.Icon>}
                {isLiked && <Button.Icon><HeartFill color={colors.accent} size={16}/></Button.Icon>}
            </Button>
        </Col>
        <Col bordered={true} padding={5} horizontalAlign={'center'} stretch>
            <Button type="text" size="sm" onClick={onCommentClick}>
                <Button.Icon><ChatSquareTextFill color={colors.accent} size={16}/></Button.Icon>
            </Button>
        </Col>
        <Col bordered={true} padding={5} horizontalAlign={'center'} stretch>
            <Button type="text" size="sm" onClick={onShareClick}>
                <Button.Icon><ShareFill color={colors.accent} size={16}/></Button.Icon>
            </Button>
        </Col>
    </Row>
}
