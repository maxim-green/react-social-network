import React from 'react'
import './popupjs.css'
import classes from './ModalWindow.module.scss'
import Button from 'components/_shared/Button/Button'
import {XLg} from 'react-bootstrap-icons'
import Popup from 'reactjs-popup'

type Props = {
    title?: string
    open: boolean
    close?: () => void
}

export const ModalWindow: React.FC<Props> = ({title, close, open, children}) => {
    return <Popup open={open} modal nested onClose={close}
                  contentStyle={{borderRadius: 5, padding: '10px'}}
                  closeOnDocumentClick={false}>
        {(title || close) && <div className={classes.header}>
            <div className={classes.title}>{title}</div>
            <div className={classes.button}>
                <Button type={'cancel'} size='small' onClick={close}>
                    <XLg/>
                </Button>
            </div>
        </div>}
        <div className={classes.content}>
            {children}
        </div>
    </Popup>
}