import React, {useEffect} from 'react'
import Feed from 'components/Feed/Feed'
import {useDispatch, useSelector} from 'react-redux'
import {getFeedPosts} from 'store/reducers/posts.reducer'
import {getSortedPosts} from 'utils/selectors'
import {Redirect} from 'react-router-dom'
import NewPostInputForm from 'components/_forms/NewPostInputForm/NewPostInputForm'
import {useAuth} from '../../hooks/useAuth'

const FeedPage: React.FC = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getSortedPosts)

    useEffect(() => {
        dispatch(getFeedPosts())
    }, [dispatch])

    const authorized = useAuth()
    if (!authorized) return <Redirect to={`/login`}/>
    return <>
        <NewPostInputForm/>
        <Feed posts={posts}/>
    </>
}

export default FeedPage
