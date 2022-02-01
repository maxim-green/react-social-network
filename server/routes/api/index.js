const router = require('express').Router()

/**
 * @swagger
 * components:
 *   responses:
 *     Success:
 *       description: This response indicates that requested operation was successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuccessfulResponse'
 *     Unauthorized:
 *       description: Request from unauthorized user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resultCode:
 *                 type: number
 *                 enum:
 *                   - 1
 *               message:
 *                 type: string
 *                 enum:
 *                   - Not authorized
 *     ServerError:
 *       description: Unknown server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resultCode:
 *                 type: number
 *                 enum:
 *                   - 1
 *               message:
 *                 type: string
 *                 enum:
 *                   - Something went wrong :(
 *   requestBodies:
 *     ImageWithCrop:
 *       description: "Image file and crop object must be provided. Crop object example: `{ width: number, height: number, x: number, y: number }`"
 *
 *
 *   schemas:
 *     SuccessfulResponse:
 *       type: object
 *       properties:
 *         resultCode:
 *           type: number
 *           enum:
 *             - 0
 *         message:
 *           type: string
 *           enum:
 *             - Success
 *     User:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *        username:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        avatar:
 *          type: object
 *          properties:
 *            small:
 *              type: string
 *            large:
 *              type: string
 *        isFriend:
 *          type: boolean
 *        isSubscription:
 *          type: boolean
 *     ImageWithCrop:
 *       type: object
 *       properties:
 *         image:
 *           type: File
 *         crop:
 *           type: object
 *           properties:
 *             width:
 *               type: number
 *             height:
 *               type: number
 *             x:
 *               type: number
 *             y:
 *               type: number
 */

router.use('/docs', require('./docs'))
router.use('/auth', require('./auth'))
router.use('/profile', require('./profile'))
router.use('/dialogs', require('./dialogs'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/follow', require('./follow'))
router.use('/friendship', require('./friendship'))

module.exports = router