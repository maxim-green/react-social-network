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

        console.log(dialog)

        res.status(200).json({resultCode: 0, message: 'Success', data: {messages: dialog.messages}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})


module.exports = router