import { insert as insertNotification } from "~/server/db/notifications/notifications"
import { dispatch } from "./notificationHub";
import { CopyTypes, NotificationTypes, Prisma, ServiceTypes, StatusTypes, Users } from "@prisma/client";

export const sendAccountValidationNotification = async(user: Users) => {

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
                placeholders: 
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
    dispatch(noti);
    return noti;
}

export const sendNotification = async(model: Prisma.NotificationsCreateInput) => {
    const noti = await insertNotification(model);
    dispatch(noti);
    return noti;
}