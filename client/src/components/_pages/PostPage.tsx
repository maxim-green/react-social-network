import Layout from '../Layout/Layout'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {StateType} from '../../redux/store'
import {deletePost, getPost} from '../../redux/reducers/posts.reducer'
import moment from 'moment'
import Post from '../Post/Post'
import Spinner from '../_shared/Spinner/Spinner'

type PostPageType = {}

const PostPage: React.FC<PostPageType> = () => {
    const {id}: { id: string } = useParams()
    const dispatch = useDispatch()
    const post = useSelector((state: StateType) => state.posts.posts[0])

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch, id])

    const onPostDelete = (id: string) => {
        dispatch(deletePost(id))
    }

    return (
        <Layout sidebar={true}>
            {!post && <Spinner/>}
            {/*{post && <Post*/}
            {/*    key={post._id}*/}
            {/*    id={post._id}*/}
            {/*    text={post.text}*/}
            {/*    username={post.author.firstName + ' ' + post.author.lastName}*/}
            {/*    avatar={post.author.avatar.small}*/}
            {/*    date={moment(post.creationDate).format('DD.MM.YYYY')}*/}
            {/*    liked*/}
            {/*    onPostLike={() => {}}*/}
            {/*    onPostDelete={onPostDelete}*/}
            {/*/>}*/}
        </Layout>

    )
}

export default PostPage