import React from 'react'
import classes from './ProfilePosts.module.scss'
import NewPostInput from '../../../NewPostInput/NewPostInput'
import Post from '../../../Post/Post'
import {PostType} from '../../../../types/types'
import moment from 'moment'

type PropsType = {
    authorized: boolean
    authorizedUserId: string | null
    userId?: string | null
    posts: Array<PostType>
}

const ProfilePosts: React.FC<PropsType> = ({
                                               authorized,
                                               authorizedUserId,
                                               userId,
                                               posts
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
                {
                    posts.slice().reverse().map(post => <Post
                        text={post.text}
                        username={post.author.firstName + ' ' + post.author.lastName}
                        date={moment(post.creationDate).format('DD.MM.YYYY')}
                        liked
                    />)
                }
            </div>
        </>
    )
}

export default ProfilePosts