import express from 'express'
import swaggerUi from 'swagger-ui-express'
import {swaggerConfig} from 'configs/index'

const router = express.Router()

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

export default router