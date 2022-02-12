import {Router} from 'express'

import docsRouter from './docs'

import authRouter from './auth'
import dialogsRouter from './dialogs'
import postsRouter from './posts'
import profileRouter from './profile'
import subscriptionRouter from './subscription'
import usersRouter from './users'


const router = Router()

router.use('/docs', docsRouter)
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/dialogs', dialogsRouter)
router.use('/users', usersRouter)
router.use('/posts', postsRouter)
router.use('/subscription', subscriptionRouter)

export default router