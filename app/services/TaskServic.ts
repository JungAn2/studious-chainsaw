import { PrismaClient, Task } from "@prisma/client"
import NotFoundException from "../exceptions/NotFoundException"

const prisma = new PrismaClient()

export const TaskService = {
    async getTasks(pid: string):Promise<Task [] | NotFoundException>{
        if(!this.checkProjectExist(pid))
            return new NotFoundException()
        const task = await prisma.task.findMany({
            where: {
                project_id: Number(pid)
            }
        })
        return task
        
    },
    async createTask(description: string, pid:string):Promise<Task | NotFoundException>{
        if(!this.checkProjectExist(pid))
            return new NotFoundException()
        const task = await prisma.task.create({
            data: {
                description,
                project_id: Number(pid)
            }
        })
        return task
    },

    async deleteTask(pid:string, id: string):Promise<Task | NotFoundException>{
        if(!this.checkProjectExist(pid))
            return new NotFoundException()
        if(!this.checkTaskExist(id))
            return new NotFoundException()
        const task = await prisma.task.delete({
            where:{
                id: Number(id)
            }
        })
        return task
    },

    async updateDescription(description: string, pid: string, id: string): Promise<Task | NotFoundException>{
        var dateTime = new Date()
        if(!this.checkProjectExist(pid))
            return new NotFoundException()
        if(!this.checkTaskExist(id))
            return new NotFoundException()
        const task = await prisma.task.update({
            where: {
                id: Number(id)
            },
            data:{
                description,
                updatedAt: dateTime
                
            }
        })
        return task
    },

    async updateComplete(completed: boolean, pid: string, id: string): Promise<Task | NotFoundException>{
        var dateTime = new Date()
        if(!this.checkProjectExist(pid))
            return new NotFoundException()
        if(!this.checkTaskExist(id))
            return new NotFoundException()
        const task = await prisma.task.update({
            where: {
                id: Number(id)
            },
            data:{
                completed,
                updatedAt: dateTime
            }
        })
        return task
    },

    async checkProjectExist(pid: string): Promise<boolean>{
        const project = await prisma.project.findUnique({
            where:{
                id: Number(pid)
            }
        })
        if(project == null)
            return false
        return true
    },

    async checkTaskExist(id: string): Promise<boolean>{
        const task = await prisma.task.findUnique({
            where:{
                id: Number(id)
            }
        })
        if(task == null)
            return false
        return true
    }
}