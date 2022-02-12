import express from 'express'
import swaggerUi from 'swagger-ui-express'
import {swaggerConfig} from 'configs'

const router = express.Router()

// TODO move swagger configs to separate file in configs directory

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

export default router