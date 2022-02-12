import express from 'express'

import {User, Dialog} from 'models'
import { auth, requireAuth } from 'middleware'
import {MongooseDocument, PopulatedDialogType, Request, Response} from 'types'

const router = express.Router()

// /api/dialogs/
router.get('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req

        // TODO refactor using generic in populate()
        const dialogs: Array<MongooseDocument<PopulatedDialogType>> = await Dialog
            .find({users: user.id})
            .populate("users", ["id", "username", "firstName", "lastName", "avatar"])
            .lean()

        const resultDialogs = dialogs.map(dialog => ({
            _id: dialog._id,
            created: dialog.createdAt,
            updated: dialog.updatedAt,
            companionUser: dialog.users.map(u => ({_id: u._id, username: u.username, firstName: u.firstName, avatar: u.avatar}))
                .find(u => u.username !== user.username),
        }))

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialogs: resultDialogs}})
    } catch(e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

// /api/dialogs/:username
router.get('/:username', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const {user} = req

        const targetUser = await User.findOne({username: req.params.username})
        if (!targetUser) return res.status(404).json({resultCode: 1, message: `Requested resource not found`})

        // TODO refactor using generic in populate()
        let dialog: MongooseDocument<PopulatedDialogType> = await Dialog.findOne({
            $and: [
                {users: {$all: [user.id, targetUser.id]}},
                {users: {$size: 2}}
            ]
        }).populate('messages.author', ['id', 'username', 'avatar', 'firstName', 'lastName']).lean()

        let resultDialog
        if (dialog) {
            resultDialog = {
                ...dialog,
                _id: dialog._id,
                messages: dialog.messages.map(m => ({
                    ...m,
                    author: {...m.author, ...m.author.profile, profile: undefined}
                }))
            }
        }

        if (!dialog) {
            resultDialog = new Dialog({
                date: new Date(),
                users: [user.id, targetUser.id],
                messages: []
            })
            await resultDialog.save()
        }

        res.status(200).json({resultCode: 0, message: 'Success', data: {_id: resultDialog._id, messages: resultDialog.messages}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})


export default router