import Card from '../_shared/Card/Card'
import React, {useState} from 'react'
import classes from './Post.module.scss'
import Avatar from '../_shared/Avatar/Avatar'
import {NavLink} from 'react-router-dom'
import Button from '../_shared/Button/Button'
import {TrashFill, Heart, HeartFill, ChatSquareTextFill, ShareFill} from 'react-bootstrap-icons'
import colors from '../../assets/styles/exports.module.scss'
import Popup from 'reactjs-popup'
import ConfirmPopup from '../_shared/ConfirmPopup/ConfirmPopup'

type PropsType = {
    id: string
    username: string
    avatar: string | null
    date: string
    text: string
    liked?: boolean
    onPostDelete?: (id: string) => void
    isAuthorizedUserProfile?: boolean
}

const Post: React.FC<PropsType> = ({
                                       id,
                                       username,
                                       avatar,
                                       date,
                                       text,
                                       liked,
                                       onPostDelete,
                                       isAuthorizedUserProfile= false
                                   }) => {

    const [open, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)


    const onDeleteClickHandler = () => {
        if (onPostDelete) onPostDelete(id)
    }

    return (
        <Card>
            <div className={classes.header}>
                <div className={classes.avatar}>
                    <NavLink to="/profile/1"><Avatar smallImg={avatar} online
                                                     size={50}/></NavLink>
                </div>
                <div className={classes.info}>
                    <NavLink to="/">
                        <div className={classes.userName}>{username}</div>
                    </NavLink>
                    <NavLink to={`/post/${id}`}><div className={classes.date}>posted on {date}</div></NavLink>
                </div>
                <div className={classes.menu}>
                    {isAuthorizedUserProfile && onPostDelete && <div>
                        <Button onClick={openModal} type="text" size="small" style={{padding: '0 4px'}}>
                            <TrashFill color={colors.midGrey1} size={16}/>
                        </Button>
                        <Popup open={open} modal nested onClose={closeModal} contentStyle={{borderRadius: 5, padding: '20px', width: 320}} closeOnDocumentClick={false}>
                            <ConfirmPopup onConfirm={onDeleteClickHandler} onDecline={closeModal} important>Are you sure you want to delete this post?</ConfirmPopup>
                        </Popup>
                    </div>}
                </div>
            </div>

            <div className={classes.content}>
                <div className={classes.text}>
                    {text}
                </div>
            </div>

            <div className={classes.controls}>
                <div className={classes.controlsItem}>
                    {!liked && <Button type="text" size="small" style={{padding: '0 4px'}}>
                        <Button.Icon><Heart color={colors.accent} size={16}/></Button.Icon>
                    </Button>}
                    {liked && <Button type="text" size="small" style={{padding: '0 4px'}}>
                        <Button.Icon><HeartFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>}
                </div>
                <div className={classes.controlsItem}>
                    <Button type="text" size="small" style={{padding: '0 4px'}}>
                        <Button.Icon><ChatSquareTextFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                </div>
                <div className={classes.controlsItem}>
                    <Button type="text" size="small" style={{padding: '0 4px'}}>
                        <Button.Icon><ShareFill color={colors.accent} size={16}/></Button.Icon>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default Post