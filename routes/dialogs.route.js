const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Dialog = require('../models/Dialog')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const auth = require('../middleware/auth.middleware')

// /api/dialogs/
router.get('/', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) return res.status(403).json({resultCode: 1, message: 'Not authorized'})

        const dialogs = await Dialog.find({users: user.id}).populate("users", ["id", "username", "profileData.firstName", "profileData.avatar"]).lean()
        // console.log(dialogs)

        const resultDialogs = dialogs.map(dialog => ({
            ...dialog,
            users: undefined,
            companionUser: dialog.users.find(u => u.username !== user.username)
        }))

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialogs: resultDialogs}})
    } catch(e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// /api/dialogs/:username
router.get('/:username', auth, async (req, res) => {
    try {
        const {user} = req
        if (!user) return res.status(403).json({resultCode: 1, message: 'Not authorized'})

        const targetUser = await User.findOne({username: req.params.username})
        if (!targetUser) return res.status(403).json({resultCode: 1, message: `Wrong username :(`})

        let dialog = await Dialog.findOne({
            $and: [
                {users: {$all: [user.id, targetUser.id]}},
                {users: {$size: 2}}
            ]
        })

        if (!dialog) {
            console.log('new')
            dialog = new Dialog({
                date: new Date(),
                users: [user.id, targetUser.id],
                messages: []
            })
            await dialog.save()
        }

        // console.log(dialog)

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialogId: dialog.id, messages: dialog.messages}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})


module.exports = router