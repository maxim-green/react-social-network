import React from 'react'
import classes from './DialogHeader.module.scss'
import {Button} from 'components/_shared/Button/Button'
import {List} from 'react-bootstrap-icons'
import {Col, Row, Space} from 'components/_shared/Flex/Flex'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {checkOnline} from 'utils/functions'
import {UserItemDataType} from 'types/types'

type Props = {
    companion: UserItemDataType
}

export const DialogHeader: React.FC<Props> = ({ companion }) => {
    return <Row padding={10} verticalAlign={'center'}>
        <Space/>
        <Col>
            <div style={{fontWeight: 700}}>
                {companion?.firstName} {companion?.lastName}
            </div>
        </Col>
        <Space/>
        <Avatar online={checkOnline(companion?.updatedAt)} smallImg={companion?.avatar.small} size={36}/>
    </Row>
}