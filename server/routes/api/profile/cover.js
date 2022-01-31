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
    upload.single('coverImage'),
    auth,
    requireAuth,
    async (req, res) => {
        try {
            const {user} = req

            const cropArea = JSON.parse(req.body.cropArea)
            const uploadPath = `/uploads/cover/${req.file.fieldname}${Date.now()}${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .extract({
                    left: Math.round(cropArea.x),
                    top: Math.round(cropArea.y),
                    width: Math.round(cropArea.width),
                    height: Math.round(cropArea.height)
                })
                .resize({fit: sharp.fit.contain, width: 720})
                .toFile(path.join(__dirname, '../../../', uploadPath))

            user.profile.coverImage = `http://localhost:${config.get('port')}${uploadPath}`
            await user.save()

            res.status(200).json({
                resultCode: 0,
                message: 'File uploaded',
                data: { coverImage: user.profile.coverImage }
            })
        } catch(e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong2'})
        }
    }
)

module.exports = router