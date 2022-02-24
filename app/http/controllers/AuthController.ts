import { Request, Response, NextFunction} from 'express'
import {Prisma, PrismaClient} from '@prisma/client'
import { json } from 'stream/consumers'

const prisma = new PrismaClient()

export const AuthController = {
    /**
     * 
     * @param req request data
     * @param res response
     * @param next next function
     * @returns 
     */
    async register(req: Request, res: Response, next: NextFunction){
        /** Simple create user without validation */
        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
        return next()
    }
}