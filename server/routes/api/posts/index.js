const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const Post = require('../../../models/Post')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')



// /api/posts?author=userId
router.get('/', async (req, res) => {
    try {
        if (req.query.author) {
            const user = await User.findOne({'username' : req.query.author})
            const posts = await Post.find({'author': user}).populate('author', 'username firstName lastName avatar')
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
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('author', 'username firstName lastName avatar')
        res.status(200).json({resultCode: 0, message: "Success", data: { post }})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /api/posts/add
router.post('/add', [
    check('text', 'New post text cannot be empty.').exists()
], auth, requireAuth, async (req, res) => {
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

        res.status(200).json({resultCode: 0, message: "Success", data: { post: newPost }})
    } catch (e) {
        console.log('---')
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

router.delete('/delete/:postId', auth, requireAuth, async (req, res) => {
    const {user} = req

    const {postId} = req.params
    const post = await Post.findById(postId).populate('author')
    if (!post) {
        return res.status(404).json({resultCode: 1, message: 'Post does not exist.'})
    }

    if (post.author.username === user.username) {
        await post.delete()
        return res.status(200).json({resultCode: 0, message: 'Post deleted.'})
    } else {
        return res.status(403).json({resultCode: 10, message: 'Access denied.'})
    }
})

module.exports = router