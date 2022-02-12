import {Router} from 'express'

import authRouter from './auth'
import dialogsRouter from './dialogs'
import postsRouter from './posts'
import profileRouter from './profile'
import subscriptionRouter from './subscription'

const router = Router()

router.use('/docs', require('./docs'))
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/dialogs', dialogsRouter)
router.use('/users', require('./users/users.route'))
router.use('/posts', postsRouter)
router.use('/subscription', subscriptionRouter)

export default router