import React, {useEffect} from 'react'
import Feed from 'components/Feed/Feed'
import Layout from 'components/Layout/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from 'redux/store'
import {getFeedPosts} from 'redux/reducers/posts.reducer'
import {getSortedPosts} from 'utils/selectors'

const FeedPage: React.FC = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getSortedPosts)


    useEffect(() => {
        dispatch(getFeedPosts())
    }, [])

    return (
        <Layout sidebar={true}>
            <Feed posts={posts} />
        </Layout>
    )
}

export default FeedPage