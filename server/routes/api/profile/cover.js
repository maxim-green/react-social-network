const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')
const config = require('config')
const path = require('path')
const sharp = require('sharp')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({storage})

/**
 * @swagger
 * /profile/cover:
 *   put:
 *     summary: Change cover image
 *     description: Change authorized user cover image
 *     tags:
 *       - profile
 *     requestBody:
 *       required: true
 *       description: |
 *         Image file and crop object must be provided. \
 *         Crop object example: `{width: number, height: number, x: number, y: number}`
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ImageWithCrop'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

router.put(
    '/',
    upload.single('image'),
    auth,
    requireAuth,
    async (req, res) => {
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
                .toFile(path.join(__dirname, '../../../', uploadPath))

            user.profile.coverImage = `http://localhost:${config.get('port')}${uploadPath}`
            await user.save()

            res.status(200).json({
                resultCode: 0,
                message: 'Success',
                data: { coverImage: user.profile.coverImage }
            })
        } catch(e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
        }
    }
)

module.exports = router