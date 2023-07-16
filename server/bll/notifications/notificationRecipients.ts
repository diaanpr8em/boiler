import { getByNotificationId as getRecipientsByNotificationId } from "~/server/db/notifications/notificationRecipients";
import { BusinessBase } from "../businessBase";

class NotificationRecipients extends BusinessBase<NotificationRecipients>{
    async getByNotificationId(notificationId: number){
        return await getRecipientsByNotificationId(notificationId);
    }
}

export const NotificationRecipientsBLL = new NotificationRecipients();