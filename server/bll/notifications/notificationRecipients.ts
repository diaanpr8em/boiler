import { getByNotificationId as getRecipientsByNotificationId } from "~/server/db/notifications/notificationRecipients";
import { BusinessBase } from "../businessbase";

export class NotificationRecipients extends BusinessBase<NotificationRecipients>{
    async getByNotificationId(notificationId: number){
        return await getRecipientsByNotificationId(notificationId);
    }
}