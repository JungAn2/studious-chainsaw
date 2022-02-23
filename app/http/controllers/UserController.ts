import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const UserController = {
    
    home(req, res, next){
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

    async create(req: Request, res: Response, next: NextFunction){
        if(req.body == null){
            return res.sendStatus(401)
        }
        if(prisma.user.findFirst(req.body.email) != null){
            return res.send("User already registered")
        }
        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
        return next()
    },

    async delete(req, res, next){
        
        return next()
    }

    
}