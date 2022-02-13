import express from 'express'
import {check, validationResult} from 'express-validator'

import {User, Post} from 'models/index'
import { auth, requireAuth } from 'middleware/index'
import {Request, Response, MongooseDocument, UserType} from 'types/index'

const router = express.Router()

router.get('/', async (req: Request & {query: {author: string}}, res: Response) => {
    try {
        if (req.query.author) {
            const user: MongooseDocument<UserType> = await User.findOne({'username' : req.query.author})
            const posts = await Post.find({'author': user._id}).populate('author', 'username firstName lastName avatar')
            return res.status(200).json({resultCode: 0, message: "Success", data: { posts } })
        }

        const posts = await Post.find().populate('author', 'username firstName lastName avatar')
        res.status(200).json({resultCode: 0, message: "Success", data: { posts }})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /api/posts/:postId
router.get('/:postId', async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.postId).populate('author', 'username firstName lastName avatar')
        if (!post) {
            return res.status(404).json({resultCode: 1, message: 'Requested resource not found'})
        }

        res.status(200).json({resultCode: 0, message: "Success", data: { post }})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /api/posts/
router.post('/', [
    check('text', 'New post text cannot be empty.').exists()
], auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                resultCode: 1,
                message: 'Invalid new post data',
                errors: errors.array()
            })
        }

        const newPost = new Post({
            creationDate: new Date(),
            author: user,
            text: req.body.text
        })
        await newPost.save()
        await Post.populate(newPost, {path: 'author', model: 'User', select: 'username firstName lastName avatar'})

        const responseData = {
            post: newPost
        }
        res.status(200).json({resultCode: 0, message: "Success", data: responseData})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

router.delete('/:id', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req

        const {id} = req.params
        const post = await Post.findById(id).populate<{author: UserType}>('author')
        if (!post) {
            return res.status(404).json({resultCode: 1, message: 'Requested resource not found'})
        }

        if (post.author.username === user.username) {
            await post.delete()
            return res.status(200).json({resultCode: 0, message: 'Success'})
        } else {
            return res.status(401).json({resultCode: 1, message: 'Forbidden'})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

export default router