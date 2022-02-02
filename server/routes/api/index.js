const router = require('express').Router()

router.use('/docs', require('./docs'))
router.use('/auth', require('./auth'))
router.use('/profile', require('./profile'))
router.use('/dialogs', require('./dialogs'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/follow', require('./follow'))
router.use('/friendship', require('./friendship'))

module.exports = router

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
 *
 *     Avatar:
 *       type: object
 *       properties:
 *         small:
 *           type: string
 *           format: uri
 *         large:
 *           type: string
 *           format: uri
 *
 *     Location:
 *       type: object
 *       properties:
 *         country:
 *           type: string
 *         city:
 *           type: string
 *
 *     Contacts:
 *       type: object
 *       properties:
 *         website:
 *           type: string
 *           format: uri
 *         vkontakte:
 *           type: string
 *           format: uri
 *         github:
 *           type: string
 *           format: uri
 *
 *     User:
 *       type: object
 *       properties:
 *        _id:
 *          type: string
 *          format: id
 *        username:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        avatar:
 *          $ref: '#/components/schemas/Avatar'
 *
 *     UserProfile:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             registrationDate:
 *               type: string
 *               format: date-time
 *             isOnline:
 *               type: boolean
 *             profile:
 *               $ref: '#/components/schemas/Profile'
 *             friends:
 *               type: array
 *               items:
 *                 type: string
 *                 format: id
 *             subscriptions:
 *               type: array
 *               items:
 *                 type: string
 *                 format: id
 *
 *     UserProfileUpdatePayload:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date
 *         bio:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         contacts:
 *           $ref: '#/components/schemas/Contacts'
 *
 *     Profile:
 *       type: object
 *       properties:
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         contacts:
 *           $ref: '#/components/schemas/Contacts'
 *         birthDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         bio:
 *           type: string
 *         coverImage:
 *           type: string
 *           format: uri
 *
 *
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

