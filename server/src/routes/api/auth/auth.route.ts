import express from 'express'
import register from './register/register.route'
import refreshTokens from './refresh-tokens/refresh-tokens.route'
import login from './login/login.route'
import logout from './logout/logout.route'
import me from './me/me.route'

const router = express.Router()
router.use('/register', register)
router.use('/refresh-tokens', refreshTokens)
router.use('/login', login)
router.use('/logout', logout)
router.use('/me', me)

export default router