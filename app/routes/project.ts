import express from 'express'
import { ProjectController } from '../http/controllers/ProjectController'
import AuthMiddleware from '../http/middleware/AuthMiddleware'

const router = express.Router()

router.use(AuthMiddleware)
router.get('/', ProjectController.get)
router.post('/create', ProjectController.create)
router.post('/delete/:id', ProjectController.delete)
router.post('/update/:id', ProjectController.update)

export default router