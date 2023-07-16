import { Prisma } from "@prisma/client";
import { prisma } from "../prismaConnection";

class Notifications {
    
    getById(id: number){
        return prisma.notifications.findUnique({
            where: { id: id}
        })
    }
    
    async insert(data: Prisma.NotificationsCreateInput){
        return prisma.notifications.create({
            data
        })
    }
}

export const NotificationsDAL = new Notifications();