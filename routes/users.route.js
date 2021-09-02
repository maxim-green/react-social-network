const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const mongoose = require('mongoose')
const auth = require('../middleware/auth.middleware')


// /coreApi/users
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().lean()

        let responseUsers
        if (req.userId) {
            const {friends, subscriptions} = await User.findById(req.userId)

            responseUsers = users.map(user => ({
                userId: user._id,
                username: user.username,
                firstName: user.profileData.firstName,
                lastName: user.profileData.lastName,
                avatar: user.profileData.avatar,
                isFriend: friends.includes(user._id),
                isSubscription: subscriptions.includes(user._id)
            }))
        }

        if (!req.userId) {
            responseUsers = users.map(user => ({
                userId: user._id,
                username: user.username,
                firstName: user.profileData.firstName,
                lastName: user.profileData.lastName,
                avatar: user.profileData.avatar,
                isFriend: false,
                isSubscription: false
            }))
        }

        return res.status(200).json({resultCode: 0, message: "Success", data: {users: responseUsers}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /coreApi/users/friend/:targetUserId
router.post('/friend/:targetUserId', auth, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {targetUserId} = req.params

        await User.findByIdAndUpdate(req.userId, {$addToSet: { friends: targetUserId }})

        res.status(200).json({resultCode: 0, message: "Friend successfully added"})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /coreApi/users/friend/:targetUserId
router.delete('/friend/:targetUserId', auth, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {targetUserId} = req.params

        await User.findByIdAndUpdate(req.userId, {$pull: { friends: targetUserId }})

        res.status(200).json({resultCode: 0, message: "Friend successfully removed"})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /coreApi/users/subscription/:targetUserId
router.post('/subscription/:targetUserId', auth, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {targetUserId} = req.params

        await User.findByIdAndUpdate(req.userId, {$addToSet: { subscriptions: targetUserId }})

        res.status(200).json({resultCode: 0, message: "Subscription successfully added"})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /coreApi/users/subscription/:targetUserId
router.delete('/subscription/:targetUserId', auth, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {targetUserId} = req.params

        await User.findByIdAndUpdate(req.userId, {$pull: { subscriptions: targetUserId }})

        res.status(200).json({resultCode: 0, message: "Subscription successfully removed"})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

module.exports = router