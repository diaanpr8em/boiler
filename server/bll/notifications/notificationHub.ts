import { NotificationContent, NotificationRecipients, Notifications } from "@prisma/client";
import { accountValidation } from "./notificationFormatters";
import { getByNotificationID as getContentByNotificationId } from "~/server/db/notifications/notificationContent";
import { getByNotificationID as getRecipientsByNotificationId } from "~/server/db/notifications/notificationRecipients";

export const dispatch = async (model: Notifications) => {
  const content = await getContentByNotificationId(model.id);
  const recipients = await getRecipientsByNotificationId(model.id);

  switch (model.notificationType) {
    case "ACCOUNT_OTP":
      break;
    case "ACCOUNT_PASSWORD_RESET":
      break;
    case "ACCOUNT_VALIDATION":
      const xxx = await accountValidation(model, content, recipients);
      break;
    case "ENTITY_NEW":
      break;
    default:
    case "GENERAL":
      break;
  }

  // send the message
};

const switchboard = async (noti: Notifications, content: NotificationContent, recipients: NotificationRecipients) => {
    // get user preferences
}
