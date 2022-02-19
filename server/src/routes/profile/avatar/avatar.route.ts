import express, {Request, Response} from 'express'
import multer from 'multer'

import { auth, requireAuth } from 'middleware'
import {updateAvatar} from 'services'

const storage = multer.memoryStorage()
const upload = multer({storage})
const router = express.Router()

router.put(
    '/',
    upload.single('image'),
    auth,
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            const avatar = await updateAvatar(req.user, req.file, JSON.parse(req.body.crop))

            res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: {avatar}
            })
        } catch (e) {
            res.handleError(e)
        }
    }
)

export default router