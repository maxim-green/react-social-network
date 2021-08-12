import React from 'react'
import classes from './ProfilePosts.module.scss'
import NewPostInput from '../../../NewPostInput/NewPostInput'
import Post from '../../../Post/Post'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
    userId: string | null
}

const ProfilePosts: React.FC<PropsType> = ({
                                               authorized,
                                               authorizedUserId,
                                               userId
                                           }) => {
    const isAuthorizedUserProfile = authorized && (authorizedUserId === userId)
    const lorem = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    `

    return (
        <>
            {isAuthorizedUserProfile && <NewPostInput/>}
            <div className={classes.posts}>
                <Post text={lorem} username="Max Georgievsky" date="10.12.2014" liked/>
                <Post text={lorem} username="Max Georgievsky" date="10.12.2015"/>
                <Post text={lorem} username="Max Georgievsky" date="10.12.2016" liked/>
            </div>
        </>
    )
}

export default ProfilePosts