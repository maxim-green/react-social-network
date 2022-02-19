import {Router} from 'express'

import docsRouter from './docs'

import authRouter from './auth/index'
import dialogsRouter from './dialogs/index'
import postsRouter from './posts/index'
import profileRouter from './profile/index'
import subscriptionRouter from './subscription/index'
import usersRouter from './users/index'


const router = Router()

router.use('/docs', docsRouter)
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/dialog', dialogsRouter)
router.use('/user', usersRouter)
router.use('/post', postsRouter)
router.use('/subscription', subscriptionRouter)

export default router