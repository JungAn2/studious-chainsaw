import { Request, Response, NextFunction } from 'express'
import { ProjectService } from '../../services/ProjectService'
import { TaskService } from '../../services/TaskServic'

export const TaskController = {
    async getTask(req: Request, res: Response, next: NextFunction){
        try{
            await ProjectService.checkPermission(req.params.pid, req.user.id)
            const task = await TaskService.getTasks(req.params.pid)
            res.send(task)
            return next()
        }catch(e){
            return next(e)
        }
    },
    async createTask(req: Request, res: Response, next: NextFunction){
        try{
            await ProjectService.checkPermission(req.params.pid, req.user.id)
            if(!req.body.description)
                return res.send("No description")
            const task = await TaskService.createTask(req.body.description, req.params.pid)
            res.send(task)
            return next()
        }catch(e){
            return next(e)
        }
    },
    async deleteTask(req: Request, res: Response, next: NextFunction){
        try{
            await ProjectService.checkPermission(req.params.pid, req.user.id)
            const task = await TaskService.deleteTask(req.params.pid, req.params.id)
            res.send(task)
            return next()
        }catch(e){
            return next(e)
        }
    },
    async updateTask(req: Request, res: Response, next: NextFunction){
        try{
            await ProjectService.checkPermission(req.params.pid, req.user.id)
            console.log(!!req.body.description)
            let task = null
            if(!!req.body.description)
                task = await TaskService.updateDescription(req.body.completed, req.params.pid, req.params.id)
            if(!!req.body.completed)
                task = await TaskService.updateComplete(req.body.completed, req.params.pid, req.params.id)
            res.send(task)
            return next()
        }catch(e){
            return next(e)
        }
    },
}