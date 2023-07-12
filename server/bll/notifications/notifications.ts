import { insert as insertNotification } from "~/server/db/notifications/notifications"
import { NotificationHub } from "./notificationHub";
import { CopyTypes, NotificationTypes, Prisma, ServiceTypes, StatusTypes, Users } from "@prisma/client";
import { Notification } from './../../../.nuxt/components.d';
import { BusinessBase } from "../businessbase";

export class Notifications extends BusinessBase<Notifications>{
    
    async sendAccountValidationNotification(user: Users){
        let newNoti: Prisma.NotificationsCreateInput;
        newNoti = {
            entity: ENTITIES.USER,
            entityId: user.id,
            notificationType: NotificationTypes.ACCOUNT_VALIDATION,
            NotificationRecipients: {
                create: {
                    contactId: 0,
                    copyType: CopyTypes.TO,
                    email: user.email,
                    handle: "",
                    fullName: `${user.name} ${user.surname}`,
                    mobile: "",
                    userId: user.id,
                    // placeholders: 
                    
                }
            },
            userId: user.id,
            retryCount: 0,
            serviceType: ServiceTypes.EMAIL,
            status: StatusTypes.NEW,
            statusMessage: "",
            templates: {},
        }
        const noti = await insertNotification(newNoti);
        new NotificationHub().dispatch(noti);
        return noti;
    }

    async sendNotification(model: Prisma.NotificationsCreateInput){
        const noti = await insertNotification(model);
        new NotificationHub().dispatch(noti);
        return noti;
    }
}