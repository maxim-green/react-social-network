import express from 'express'
import path from 'path'
import config from 'config'
import sharp from 'sharp'
import multer from 'multer'

import { auth, requireAuth } from 'middleware'
import {Date} from 'mongoose'
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

            console.log(req.file)

            const crop = JSON.parse(req.body.crop)

            const lgPath = `/uploads/avatar/${req.file.fieldname}${Date.now()}-lg${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .toFile(path.join(__dirname, '../../../../../', lgPath))

            const smPath = `/uploads/avatar/${req.file.fieldname}${Date.now()}-sm${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .extract({
                    left: Math.round(crop.x),
                    top: Math.round(crop.y),
                    width: Math.round(crop.width),
                    height: Math.round(crop.height)
                })
                .resize(120, 120)
                .toFile(path.join(__dirname, '../../../../../', smPath))

            user.avatar = {
                small: `http://localhost:${config.get('port')}${smPath}`,
                large: `http://localhost:${config.get('port')}${lgPath}`
            }
            await user.save()

            res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: user.avatar
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    }
)

export default router