import express from 'express'
import { TaskController } from '../http/controllers/TaskController'
import AuthMiddleware from '../http/middleware/AuthMiddleware'

const router = express.Router()

router.use(AuthMiddleware)
router.get('/', TaskController.getTask)
router.post('/create', TaskController.createTask)
router.post('/delete/:id', TaskController.deleteTask)
router.post('/update/:id', TaskController.updateTask)

export default router