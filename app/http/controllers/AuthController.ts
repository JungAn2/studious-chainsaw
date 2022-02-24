import { Request, Response, NextFunction} from 'express'
import {Prisma, PrismaClient} from '@prisma/client'
import validRegister from '../middleware/RegisterMiddleware'
import { AuthService } from '../../services/AuthService'


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
        const user = req.body
        next(validRegister(req.body, res))
        const registerUser = AuthService.register(user)
        res.json(user)
        return next()



        /*
        const email = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }

        })
        const username = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })
        if(email != null)
        {
            return res.send('Email already registered')
        }
        if(username != null)
        {
            return res.send('Usernmae already registered')
        }

        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
        return next()
        */
    }
}