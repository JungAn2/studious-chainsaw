import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function({user}, res: Response){
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
        return res.sendStatus(400)
    }
    if (username != null){
        return res.send('Username already registerd')
    }
    return user
}