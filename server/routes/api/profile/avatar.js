const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')
const config = require('config')
const path = require('path')
const sharp = require('sharp')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage})



router.put(
    '/',
    upload.single('avatar'),
    auth,
    requireAuth,
    async (req, res) => {
        try {
            const {user} = req

            const crop = JSON.parse(req.body.crop)

            const lgPath = `/uploads/avatar/${req.file.fieldname}${Date.now()}-lg${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .toFile(path.join(__dirname, '../../../', lgPath))

            const smPath = `/uploads/avatar/${req.file.fieldname}${Date.now()}-sm${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .extract({
                    left: Math.round(crop.x),
                    top: Math.round(crop.y),
                    width: Math.round(crop.width),
                    height: Math.round(crop.height)
                })
                .resize(120, 120)
                .toFile(path.join(__dirname, '../../../', smPath))

            user.avatar = {
                small: `http://localhost:${config.get('port')}${smPath}`,
                large: `http://localhost:${config.get('port')}${lgPath}`
            }
            await user.save()

            res.status(200).json({
                resultCode: 0,
                message: 'File uploaded',
                data: user.avatar
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong2'})
        }
    }
)

module.exports = router