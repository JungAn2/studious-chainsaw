import { Request, Response, NextFunction } from 'express'
import MissingBodyException from '../../exceptions/MissingBodyException'
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
        try{
            await ProjectService.checkPermission(req.params.id, req.user.id)
            res.send(await ProjectService.deleteProject(req.params.id))
            return next()
        }catch(e){
            return next(e)
        }
    },

    async update(req: Request, res: Response, next: NextFunction){
        try{
            if(!req.body.title)
                throw new MissingBodyException()
            await ProjectService.checkPermission(req.params.id, req.user.id)
            res.send(await ProjectService.updateProject(req.body.title, req.params.id))
            return next()
        }catch(e){
            return next(e)
        }
    },
}