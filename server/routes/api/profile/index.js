const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

// /api/profile/:username
router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const user = await User
            .findOne({username})
            .populate('profile')
            .select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests')

        res.status(200).json({resultCode: 0, message: 'GET Profile:Success', data: {user: user.toObject()}})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})


const storage = multer.memoryStorage()
const upload = multer({storage})
// /api/profile/avatar
router.put(
    '/avatar',
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

router.put(
    '/cover',
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

router.put('/status', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const { status } = req.body

        user.profile.status = status
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Status updated'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong2'})
    }
})

// /api/profile
router.put('/', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const {firstName, lastName, ...profile} = req.body
        user.firstName = firstName
        user.lastName = lastName
        user.profile = {...user.profile, ...profile}
        await user.save()

        res.status(200).json({resultCode: 0, message: 'ProfileInfo updated'})
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 10, message: 'Token expired'})
        if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: 'Token invalid'})
        res.status(500).json({resultCode: 1, message: 'Something went wrong2 :('})
    }
})


module.exports = router