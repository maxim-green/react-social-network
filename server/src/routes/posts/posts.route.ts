import express, {Request, Response} from 'express'
import {check, validationResult} from 'express-validator'

import {auth, requireAuth} from 'middleware'
import {createPost, deletePost, getPost, getPosts, findUser, getUserPosts} from 'services'
import {throwValidationError} from 'helpers'

const router = express.Router()

router.get('/', async (req: Request & { query: { author: string } }, res: Response) => {
    try {
        const posts = getPosts()
        res.status(200).json({resultCode: 0, message: 'Success', data: {posts}})
    } catch (e) {
        res.handleError(e)
    }
})

// /api/posts/:postId
router.get('/:postId', async (req: Request, res: Response) => {
    try {
        const post = await getPost(req.params.postId)
        res.status(200).json({resultCode: 0, message: 'Success', data: {post}})
    } catch (e) {
        res.handleError(e)
    }
})

const validators = [
    check('text', 'New post text cannot be empty.').exists()
]
// /api/posts/
router.post('/', validators, auth, requireAuth,
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throwValidationError(errors.array())
            const post = await createPost(req.user, req.body.text )

            res.status(200).json({resultCode: 0, message: 'Success', data: { post }})
        } catch (e) {
            res.handleError(e)
        }
    }
)

router.delete('/:id', auth, requireAuth, async (req: Request, res: Response) => {
    try {

        await deletePost(req.user, req.params.id)

        return res.status(200).json({resultCode: 0, message: 'Success'})
    } catch (e) {
        res.handleError(e)
    }
})

export default router