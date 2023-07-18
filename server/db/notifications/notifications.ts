import { NotificationRequest } from "~/server/models/validation/notifications/notifications";
import { prisma } from "../prismaConnection";

class Notifications {
    
    getById(id: number){
        return prisma.notifications.findUnique({
            where: { id: id}
        })
    }
    
    async insert(data: NotificationRequest){
        const nr = await prisma.notifications.create({
            data: {
                entity: data.notification.entity,
                entityId: data.notification.entityId,
                notificationType: data.notification.type,
                userId: data.notification.userId,
                templates: {
                    connect: {
                        id: data.notification.templateId
                    }
                },
            }
        })

        prisma.notificationRecipients.createMany({
            data: data.recipients.map(r => {
                return {
                    contactId: r.contactid as unknown as number,
                    copyType: r.copyType,
                    email: r.email,
                    fullName: r.fullName,
                    handle: r.handle,
                    mobile: r.mobile,
                    notificationId: nr.id,
                    placeholders: r.placeholders as unknown as string,
                    userId: r.userId
                }
            }
        )})

        return nr;
    }
}

export const NotificationsDAL = new Notifications();