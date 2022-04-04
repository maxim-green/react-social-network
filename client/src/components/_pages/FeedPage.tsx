import React, {useEffect} from 'react'
import Feed from 'components/Feed/Feed'
import {useDispatch, useSelector} from 'react-redux'
import {getFeedPosts} from 'redux/reducers/posts.reducer'
import {getSortedPosts} from 'utils/selectors'
import {useAuthCheck} from 'utils/hooks'
import {Redirect} from 'react-router-dom'
import NewPostInputForm from 'components/_forms/NewPostInputForm/NewPostInputForm'

const FeedPage: React.FC = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getSortedPosts)

    useEffect(() => {
        dispatch(getFeedPosts())
    }, [dispatch])

    const authorized = useAuthCheck()
    if (!authorized) return <Redirect to={`/login`}/>
    return <>
        <NewPostInputForm/>
        <Feed posts={posts}/>
    </>
}

export default FeedPage