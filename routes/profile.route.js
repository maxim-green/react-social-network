const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const auth = require('../middleware/auth.middleware')


// /api/profile/:username
router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const {_id, profileData} = await User.findOne({username}).lean()

        res.status(200).json({resultCode: 0, message: 'Success', data: {userId: _id, ...profileData}})
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
    async (req, res) => {
        console.log(req.file)
        try {
            const {user} = req
            const crop = JSON.parse(req.body.crop)
            if (!user) return res.status(403).json({resultCode: 1, message: 'Not authorized'})

            const lgPath = `/uploads/avatar/${req.file.fieldname}${Date.now()}-lg${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .toFile(path.join(__dirname, '..', lgPath))

            const smPath = `/uploads/avatar/${req.file.fieldname}${Date.now()}-sm${path.extname(req.file.originalname)}`
            await sharp(req.file.buffer)
                .extract({
                    left: Math.round(crop.x),
                    top: Math.round(crop.y),
                    width: Math.round(crop.width),
                    height: Math.round(crop.height)
                })
                .resize(120, 120)
                .toFile(path.join(__dirname, '..', smPath))

            user.profileData.avatar = {
                small: `http://localhost:${config.get('port')}${smPath}`,
                large: `http://localhost:${config.get('port')}${lgPath}`
            }
            await user.save()

            //update avatar in all user posts
            await Post.updateMany({'author.username': user.username}, {$set: {'author.avatar': user.profileData.avatar}})

            res.status(200).json({
                resultCode: 0,
                message: 'File uploaded',
                data: user.profileData.avatar
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: 'Something went wrong2'})
        }
    }
)

// /api/profile
router.put('/', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) return res.status(403).json({resultCode: 1, message: 'Not authorized'})

        //update avatar in all user posts
        if (user.profileData.firstName !== req.body.firstName || user.profileData.lastName !== req.body.lastName) {
            await Post.updateMany({'author.username': user.username}, {
                $set: {
                    'author.firstName': req.body.firstName,
                    'author.lastName': req.body.lastName
                }
            })
        }

        user.profileData = req.body
        await user.save()

        res.status(200).json({resultCode: 0, message: 'ProfileInfo updated'})
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 10, message: 'Token expired'})
        if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: 'Token invalid'})
        res.status(500).json({resultCode: 1, message: 'Something went wrong2 :('})
    }
})


module.exports = router