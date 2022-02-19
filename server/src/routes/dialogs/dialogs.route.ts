import express, {Request, Response} from 'express'

import {auth, requireAuth} from 'middleware'
import {findUserDialogs, createDialog, findDialog, findUser} from 'services'

const router = express.Router()



// /api/dialogs/
router.get('/', auth, requireAuth, async (req: Request, res: Response) => {
    try {

        const dialogs = await findUserDialogs(req.user.id)

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialogs}})
    } catch (e) {
        res.handleError(e)
    }
})

// /api/dialogs/:username
router.get('/:username', auth, requireAuth, async (req: Request, res: Response) => {
    try {
        const targetUser = await findUser({username: req.params.username})

        const dialog = await findDialog(req.user.id, targetUser.id)
        const resultDialog = dialog ? dialog : await createDialog(req.user.id, targetUser.id)

        res.status(200).json({resultCode: 0, message: 'Success', data: {dialog: resultDialog}})
    } catch (e) {
        res.handleError(e)
    }
})

export default router