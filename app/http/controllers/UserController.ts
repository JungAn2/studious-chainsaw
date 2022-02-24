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
        const user = prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (user == null){
            return res.send("Not registered")
        }
        const token = await prisma.token.create({
            data: {
                token: AuthService.tokenGen(req.body),
                tokenId: (await user).id
            }
        })

        res.json(token)
        return next()
    },

    async delete(req: Request, res: Response, next:NextFunction){
        const id = req.params.id
        const findUser = prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if(findUser == null){
            return res.send('User not found')
        }

        await prisma.user.delete({
            where:{
                id: Number(id),
            }
        })
        res.json(findUser)
        return next()
    }

    
}