import { Request, Response, NextFunction } from 'express'
import { ProjectService } from '../../services/ProjectService'

export const ProjectController = {

    async get(req: Request, res: Response, next: NextFunction){
        const project = await ProjectService.getProject(req.user.id)
        res.send(project)
        return next()
    },

    async create(req: Request, res: Response, next: NextFunction){
        if(!req.body.title)
            res.send("Not enough blah blah")
        const project = await ProjectService.createProject(req.body.title, req.user.id)
        res.send(project)
        return next()
    },

    async delete(req: Request, res: Response, next: NextFunction){
        const project = await ProjectService.deleteProject(req.params.id)
        res.send(project)
        return next()
    },

    async update(req: Request, res: Response, next: NextFunction){
        if(!req.body.title)
            res.send("Not enough blah blah")
        const project = await ProjectService.updateProject(req.body.title, req.params.id)
        res.send(project)
        return next()
    },
}