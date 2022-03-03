import express from 'express'
import { TaskController } from '../http/controllers/TaskController'
import AuthMiddleware from '../http/middleware/AuthMiddleware'

const router = express.Router()

router.use(AuthMiddleware)
router.get('/:pid/tasks', TaskController.getTask)
router.post('/:pid/tasks/create', TaskController.createTask)
router.post('/:pid/tasks/delete/:id', TaskController.deleteTask)
router.post('/:pid/tasks/update/:id', TaskController.updateTask)

export default router