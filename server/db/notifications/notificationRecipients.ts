import { prisma } from "../prismaConnection";

class NotificationRecipients {

    async getById(id: number){
        return prisma.notificationRecipients.findUnique({
            where: { id: id}
        })
    }
    
    async getByNotificationId(id: number){
        return prisma.notificationRecipients.findMany({
            where: { notificationId: id}
        })
    };
}

export const NotificationRecipientsDAL = new NotificationRecipients();