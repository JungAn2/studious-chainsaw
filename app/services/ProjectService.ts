import { PrismaClient, Project } from "@prisma/client"
import NotFoundException from "../exceptions/NotFoundException"

const prisma = new PrismaClient()

export const ProjectService = {
    async getProject(id: number):Promise<Project []>{
        const project = await prisma.project.findMany({
            where:{
                user_id: id
            }
        })
        return project
    },
    async createProject(title: string, id: number):Promise<Project>{
        const project = await prisma.project.create({
            data:{
                title,
                user_id: id
            }
        })
        return project
    },
    async deleteProject(pid: string): Promise<Project | NotFoundException>{
        const exist = await this.findProject(pid)
        if(exist == null)
            return new NotFoundException()
        const project = await prisma.project.delete({
            where: {
                id: Number(pid)
            }
        })
        return project
    },
    async updateProject(title: string, pid: string): Promise<Project | NotFoundException>{
        var dateTime = new Date()
        const exist = await this.findProject(pid)
        if(exist==null)
            return new NotFoundException()
        const project = await prisma.project.update({
            where: {
                id: Number(pid)
            },
            data:{
                title,
                updatedAt: dateTime
            }
        })
        return project
    },

    async findProject(pid: string):Promise<Project>{
        const project = await prisma.project.findFirst({
            where: {
                id: Number(pid),
            }
        })
        return project
    },
}