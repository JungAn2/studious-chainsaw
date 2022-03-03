import { Request, Response, NextFunction } from 'express'
import { TaskService } from '../../services/TaskServic'

export const TaskController = {
    async getTask(req: Request, res: Response, next: NextFunction){
        const task = await TaskService.getTasks(req.params.pid)
        res.send(task)
        return next()
    },
    async createTask(req: Request, res: Response, next: NextFunction){
        
    },
    async deleteTask(req: Request, res: Response, next: NextFunction){
        
    },
    async updateTask(req: Request, res: Response, next: NextFunction){
        
    },
}