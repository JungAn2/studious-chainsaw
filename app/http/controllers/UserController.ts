import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const UserController = {
    
    home(req: Request, res: Response, next: NextFunction){
        res.send('this')
        return next()
    },

    async login(req: Request, res: Response, next: NextFunction){
        const user = req.body
        if(!prisma.user.findFirst(req.body.email)){
           return res.send("User or password not correct")
        }
        if((await prisma.user.findFirst(req.body.email)).password != user.password){
            return res.send("User or password not correct")
        }
        const token = AuthService.tokenGen({user})
        res.json(token)
        return next()
    },

    async delete(req: Request, res: Response, next:NextFunction){
        const id = req.params.id
        const ss = prisma.user.findFirst({
            where: {
                id: Number(id)
            },
            select:{
                id: true
            }
        })
        return res.send()

        if (prisma.user.findFirst({
            where: {
                id: Number(id)
            }
        })){
            return res.send()
        }

        const user = await prisma.user.delete({
            where:{
                id: Number(id),
            }
        })
        res.json(user)
        return next()
    }

    
}