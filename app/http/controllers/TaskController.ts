import { Request, Response, NextFunction } from 'express'
import { TaskService } from '../../services/TaskServic'

export const TaskController = {
    async getTask(req: Request, res: Response, next: NextFunction){
        const task = await TaskService.getTasks(req.params.pid)
        res.send(task)
        return next()
    },
    async createTask(req: Request, res: Response, next: NextFunction){
        if(!req.body.description)
            return res.send("No description")
        const task = await TaskService.createTask(req.body.description, req.params.pid)
        res.send(task)
        return next()
    },
    async deleteTask(req: Request, res: Response, next: NextFunction){
        const task = await TaskService.deleteTask(req.params.pid, req.params.id)
        res.send(task)
        return next()
    },
    async updateTask(req: Request, res: Response, next: NextFunction){
        console.log(!!req.body.description)
        let task = null
        if(!!req.body.description)
            task = await TaskService.updateDescription(req.body.completed, req.params.pid, req.params.id)
        if(!!req.body.completed)
            task = await TaskService.updateComplete(req.body.completed, req.params.pid, req.params.id)
        res.send(task)
        return next()
    },
}