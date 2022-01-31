const router = require('express').Router()
const { auth, requireAuth } = require('../../../middleware/auth.middleware')

/**
 * @swagger
 * /profile/status:
 *   put:
 *     summary: Change status
 *     description: Change authorized user status.
 *     tags:
 *       - profile
 *     requestBody:
 *       required: true
 *       description: New status string must be provided.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: number
 *                   enum:
 *                     - 0
 *                 message:
 *                   type: string
 *                   enum:
 *                     - Status updated
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultCode:
 *                   type: number
 *                   enum:
 *                     - 1
 *                 message:
 *                   type: string
 *                   enum:
 *                     - Something went wrong :(
 *
 */

router.put('/', auth, requireAuth, async (req, res) => {
    try {
        const {user} = req

        const { status } = req.body

        user.profile.status = status
        await user.save()

        res.status(200).json({resultCode: 0, message: 'Status updated'})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
})

module.exports = router