import { NotificationRecipientsDAL } from "~/server/db/notifications/notificationRecipients";
import { BusinessBase } from "../businessBase";

class NotificationRecipients {
    async getByNotificationId(notificationId: number){
        return await NotificationRecipientsDAL.getByNotificationId(notificationId);
    }
}

export const NotificationRecipientsBLL = new NotificationRecipients();