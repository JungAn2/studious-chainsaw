import { PrismaClient, Project } from "@prisma/client"
import NotFoundException from "../exceptions/NotFoundException"
import UnauthorizedException from "../exceptions/UnauthorizedException"

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
    async deleteProject(pid: string): Promise<Project>{
        const exist = await this.findProject(pid)
        if(exist == null)
            throw new NotFoundException()
        const project = await prisma.project.delete({
            where: {
                id: Number(pid)
            }
        })
        return project
    },
    async updateProject(title: string, pid: string): Promise<Project>{
        const exist = await this.findProject(pid)
        if(exist==null)
            throw new NotFoundException()
        const project = await prisma.project.update({
            where: {
                id: Number(pid)
            },
            data:{
                title,
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
    async checkPermission(id: string, uid: number):Promise<void>{
        const project = await prisma.project.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(project.user_id != uid)
            throw new UnauthorizedException()
    },
}