import Card from '../common/Card/Card'
import React, {useState} from 'react'
import classes from './Post.module.scss'
import Avatar from '../common/Avatar/Avatar'
import {NavLink} from 'react-router-dom'
import Button from '../common/Button/Button'
import menuDotsIcon from '../../assets/images/menu-dots-icon.svg'
import likeLikedIcon from '../../assets/images/like-liked-icon.svg'
import likeUnlikedIcon from '../../assets/images/like-unliked-icon.svg'
import commentIcon from '../../assets/images/comment-icon.svg'
import shareIcon from '../../assets/images/share-icon.svg'

type PropsType = {
    id: string
    username: string
    avatar: string | null
    date: string
    text: string
    liked?: boolean
    onPostDelete: (id:string) => void
    isAuthorizedUserProfile: boolean
}

const Post: React.FC<PropsType> = ({
                                       id,
                                       username,
                                       avatar,
                                       date,
                                       text,
                                       liked,
                                       onPostDelete,
                                       isAuthorizedUserProfile
                                   }) => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)

    const onDeleteClickHandler = () => {
        onPostDelete(id)
        setIsMenuOpened(false)
    }

    return (
        <Card>

            <div className={classes.header}>
                <div className={classes.avatar}>
                    <NavLink to="/profile/1"><Avatar img={avatar} online
                                                     size='md'/></NavLink>
                </div>
                <div className={classes.info}>
                    <NavLink to="/">
                        <div className={classes.userName}>{username}</div>
                    </NavLink>
                    <div className={classes.date}>posted on {date}</div>
                </div>
                <div className={classes.menu}>
                    {isAuthorizedUserProfile && <div>
                        {isMenuOpened && <div style={{display: 'flex'}}>
                            <div><Button caption={'Del'} onClick={onDeleteClickHandler}/></div>
                            <div><Button icon={menuDotsIcon} variant="text" size="sm"
                                         onClick={() => setIsMenuOpened(false)}/></div>
                        </div>}
                        {!isMenuOpened &&
                        <Button icon={menuDotsIcon} variant="text" size="sm" onClick={() => setIsMenuOpened(true)}/>}
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
                    {!liked && <Button icon={likeUnlikedIcon} variant="text" size="sm" caption="Like"/>}
                    {liked && <Button icon={likeLikedIcon} variant="text" size="sm" caption="Unlike"/>}
                </div>
                <div className={classes.controlsItem}>
                    <Button icon={commentIcon} variant="text" size="sm" caption="Comment"/>
                </div>
                <div className={classes.controlsItem}>
                    <Button icon={shareIcon} variant="text" size="sm" caption="Share"/>
                </div>
            </div>

        </Card>
    )
}

export default Post