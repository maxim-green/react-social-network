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


// /api/posts/
// router.get('/', async (req, res) => {
//     try {
//
//         res.status(200).json({resultCode: 0, message: "Success"})
//     } catch (e) {
//         res.status(500).json({resultCode: 1, message: "Something went wrong :("})
//     }
// })

// /api/posts/
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({resultCode: 0, message: "Success", posts})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /api/posts/:userId
router.get('/:userId', async (req, res) => {
    try {
        const posts = await Post.find({'author.id': req.params.userId})
        res.status(200).json({resultCode: 0, message: "Success", posts})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /api/posts/add
router.post('/add', auth, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {username, profileData: {firstName, lastName, avatar: {small: avatar}}} = await User.findById(req.userId)

        const newPost = new Post({
            creationDate: new Date(),
            author: {
                id: req.userId,
                username,
                firstName,
                lastName,
                avatar
            },
            text: req.body.text
        })
        console.log(newPost)
        await newPost.save()

        res.status(200).json({resultCode: 0, message: "Success"})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

module.exports = router