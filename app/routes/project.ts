import express from 'express'
import { ProjectController } from '../http/controllers/ProjectController'
import AuthMiddleware from '../http/middleware/AuthMiddleware'

import taskRouter from './task'

const router = express.Router()

router.use(AuthMiddleware)
router.get('/index', ProjectController.get)
router.post('/create', ProjectController.create)
router.post('/:id/delete', ProjectController.delete)
router.post('/:id/update', ProjectController.update)

router.use('/', taskRouter)

export default router