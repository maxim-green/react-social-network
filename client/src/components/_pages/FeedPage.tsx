import React, {useEffect} from 'react'
import Layout from '../Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import Post from '../Post/Post'
import moment from 'moment'
import {getFeed} from 'redux/reducers/feed.reducer'

const FeedPage: React.FC = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state: StateType) => state.feed.posts)

    useEffect(() => {
        dispatch(getFeed())
    }, [dispatch])

    return (
        <Layout sidebar>
            {posts && posts.slice().reverse().map(post => <Post
                key={post._id}
                id={post._id}
                text={post.text}
                username={post.author.firstName + ' ' + post.author.lastName}
                avatar={post.author.avatar.small}
                date={moment(post.creationDate).format('DD.MM.YYYY')}
                liked
            />)}
        </Layout>
    )
}

export default FeedPage