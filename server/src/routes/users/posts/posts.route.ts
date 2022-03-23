import express, {Request, Response} from 'express'

import {getUserPosts} from 'services'

const router = express.Router()

// todo: fill doc file
// /api/user/:username/post
router.get('/:username/posts', async (req: Request, res: Response) => {
    try {
        const posts = await getUserPosts(req.params.username)
        return res.status(200).json({resultCode: 0, message: 'Success', data: {posts}})

    } catch (e) {
        res.handleError(e)
    }
})

export default router


