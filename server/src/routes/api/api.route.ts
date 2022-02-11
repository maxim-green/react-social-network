import {Router} from 'express'
import authRouter from './auth'
import dialogsRouter from './dialogs'
import postsRouter from './posts'

const router = Router()

router.use('/docs', require('./docs'))
router.use('/auth', authRouter)
router.use('/profile', require('./profile/profile.route'))
router.use('/dialogs', dialogsRouter)
router.use('/users', require('./users/users.route'))
router.use('/posts', postsRouter)
router.use('/subscription', require('./subscription/subscription.route'))

export default router