import express from 'express'

import {User, Dialog} from 'models'
import { auth, requireAuth } from 'middleware'
import {
    MongooseDocument,
    PopulatedDialogType,
    Request,
    Response,
    UserType
} from 'types'
import {Types} from "mongoose"

const router = express.Router()



const getDialogsWithoutMessages = async (userId: Types.ObjectId): Promise<Array<MongooseDocument<PopulatedDialogType>>> => {
    // TODO consider refactoring using generic in populate() like it described here: https://mongoosejs.com/docs/typescript/populate.html
    return await Dialog
        .find({users: userId})
        .select('-messages')
        .populate("users", ["_id", "username", "firstName", "lastName", "avatar"])
}

const findDialog = async (userId1: Types.ObjectId, userId2: Types.ObjectId) => {
    let dialog = await Dialog.findOne({
        $and: [
            {users: {$all: [userId1, userId2]}},
            {users: {$size: 2}}
        ]
    }).populate<{messages: {author: UserType}}>('messages.author', ['id', 'username', 'avatar', 'firstName', 'lastName'])

    return dialog
}

const createDialog = async (userId1: Types.ObjectId, userId2: Types.ObjectId) => {
    const dialog = new Dialog({
        date: new Date(),
        users: [userId1, userId2],
        messages: []
    })
    await dialog.save()

    return dialog
}




// /api/dialogs/
router.get('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {

        const dialogs = await getDialogsWithoutMessages(req.user.id)

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialogs}})
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

        const dialog = await findDialog(user.id, targetUser.id)

        const resultDialog = dialog ? dialog : await createDialog(user.id, targetUser.id)

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialog: resultDialog}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

export default router