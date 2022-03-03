import express from 'express'
import { ProjectController } from '../http/controllers/ProjectController'
import AuthMiddleware from '../http/middleware/AuthMiddleware'

const router = express.Router()

router.use(AuthMiddleware)
router.get('/:id', ProjectController.get)
router.post('/create', ProjectController.create)
router.post('/:id/delete', ProjectController.delete)
router.post('/:id/update', ProjectController.update)

export default router