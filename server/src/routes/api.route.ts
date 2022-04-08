import {Request, Response, Router} from 'express'

import docsRouter from './docs'

import authRouter from './auth/index'
import dialogsRouter from './dialogs/index'
import postsRouter from './post/index'
import profileRouter from './profile/index'
import subscriptionRouter from './subscription/index'
import usersRouter from './users/index'
import {expressApp} from 'configs'
import {deleteFile} from 'helpers'


const router = Router()

router.use('/docs', docsRouter)
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/dialog', dialogsRouter)
router.use('/user', usersRouter)
router.use('/post', postsRouter)
router.use('/subscription', subscriptionRouter)

router.get('/img', (req: Request, res: Response) => {
    const url = 'https://source.unsplash.com/random/1920x1080/?nature'
})

router.delete('/uploads/*', async (req: Request, res: Response) => {
        const url = `${process.env.URL}:${process.env.PORT}/uploads/${req.params[0]}`
        await deleteFile(url)
        res.end(`${url} deleted`)
})


export default router