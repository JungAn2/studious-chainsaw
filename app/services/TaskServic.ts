import { PrismaClient, Task } from "@prisma/client"
import NotFoundException from "../exceptions/NotFoundException"

const prisma = new PrismaClient()

export const TaskService = {
    async getTasks(pid: string):Promise<Task [] | NotFoundException>{
        if(this.checkProjectExist(pid))
            return new NotFoundException()
        const task = await prisma.task.findMany({
            where: {
                project_id: Number(pid)
            }
        })
        return task
        
    },
    async createTask(description: string, pid:string):Promise<Task | NotFoundException>{
        if(this.checkProjectExist(pid))
            return new NotFoundException()
        const task = await prisma.task.create({
            data: {
                description,
                project_id: Number(pid)
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
    }
}