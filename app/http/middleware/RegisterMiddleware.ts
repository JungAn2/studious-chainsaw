import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function(req: Request, res: Response, next: NextFunction){
    const user = req.body
    const email = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })
    const username = await prisma.user.findUnique({
        where:{
            username: user.username
        }
    })
    if (email != null){
        return res.send('Status(400)')
    }
    if (username != null){
        return res.send('Username already registerd')
    }
}