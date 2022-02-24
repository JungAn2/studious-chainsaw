import { Request, Response, NextFunction} from 'express'
import {Prisma, PrismaClient} from '@prisma/client'
import validRegister from '../middleware/RegisterMiddleware'
import { AuthService } from '../../services/AuthService'
import { UserController } from './UserController'

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
        
        next(validRegister(req, res, next))
        const user = req.body
        const registerUser = AuthService.register(user)
        res.json(user)
        return next()
    }
}