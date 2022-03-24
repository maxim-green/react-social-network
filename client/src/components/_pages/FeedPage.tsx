import React, {useEffect} from 'react'
import Feed from 'components/Feed/Feed'
import {useDispatch, useSelector} from 'react-redux'
import {getFeedPosts} from 'redux/reducers/posts.reducer'
import {getSortedPosts} from 'utils/selectors'

const FeedPage: React.FC = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getSortedPosts)


    useEffect(() => {
        dispatch(getFeedPosts())
    }, [])

    return <Feed posts={posts}/>
}

export default FeedPage