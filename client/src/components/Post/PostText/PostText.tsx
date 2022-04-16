import React from 'react'
import classes from './PostText.module.scss'
import {Row} from 'components/_shared/Flex/Flex'

export const PostText: React.FC = ({children}) => {
    return <Row padding={'10px 40px 30px'} verticalAlign={'start'} bordered={true}>
        <div className={classes.text}>
            {children}
        </div>
    </Row>
}
