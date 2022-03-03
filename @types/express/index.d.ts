export {};

import { Project, Task, User } from '@prisma/client'

declare global {
    namespace Express {
        interface Request {
            user?: User
            project?: Project
            task?: Task
        }
    }
}