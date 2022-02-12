import express from 'express'
import path from 'path'
import sharp from 'sharp'
import multer from 'multer'

import {auth, requireAuth} from 'middleware'
import {Request, Response} from 'types'

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
            const {user} = req

            const cropArea = JSON.parse(req.body.crop)
            const uploadPath = `/uploads/cover/${req.file.fieldname}${Date.now()}${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .extract({
                    left: Math.round(cropArea.x),
                    top: Math.round(cropArea.y),
                    width: Math.round(cropArea.width),
                    height: Math.round(cropArea.height)
                })
                .resize({fit: sharp.fit.contain, width: 720})
                .toFile(path.join(__dirname, '../../../../../', uploadPath))

            user.coverImage = `http://localhost:${process.env.PORT}${uploadPath}`
            await user.save()

            res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: { coverImage: user.coverImage }
            })
        } catch(e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    }
)

export default router