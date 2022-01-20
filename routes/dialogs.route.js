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

        const dialogs = await Dialog
            .find({users: user.id})
            .populate("users", ["id", "username", "profileData.firstName", "profileData.lastName", "profileData.avatar"])
            .lean()

        const resultDialogs = dialogs.map(dialog => ({
            id: dialog._id,
            created: dialog.created,
            updated: dialog.updated,
            companionUser: dialog.users.map(u => ({_id: u.id, username: u.username, ...u.profileData}))
                .find(u => u.username !== user.username),
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
        }).populate('messages.author', ['id', 'username', 'profileData.avatar', 'profileData.firstName', 'profileData.lastName']).lean()

        let resultDialog
        if (dialog) {
            resultDialog = {
                ...dialog,
                id: dialog._id,
                messages: dialog.messages.map(m => ({
                    ...m,
                    author: {...m.author, ...m.author.profileData, profileData: undefined}
                }))
            }
        }

        if (!dialog) {
            console.log('new')
            resultDialog = new Dialog({
                date: new Date(),
                users: [user.id, targetUser.id],
                messages: []
            })
            await resultDialog.save()
        }

        res.status(200).json({resultCode: 0, message: 'Success', data: {currentDialogId: resultDialog.id, date: resultDialog.creationDate, messages: resultDialog.messages}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})


module.exports = router