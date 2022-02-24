import { Request, Response, NextFunction} from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const AuthController = {
    async register(req: Request, res: Response, next: NextFunction){
        if(null == prisma.user.findFirst({
            where: {
                email: req.body.email,
            }})
            ){
            return res.send("Email already registerd")
            }
        if(null == prisma.user.findUnique({
            where: {
                username: req.body.username
            }})){
            return res.send("Username already registerd")
        }
        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
        return next()
    }
}