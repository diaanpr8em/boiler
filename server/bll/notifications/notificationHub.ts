import {
  CopyTypes,
  MessageTypes,
  NotificationRecipients,
  Notifications,
  ServiceTypes,
  Services,
  Templates
} from "@prisma/client";
import { EmailMessage as SimpleEmailMessage } from "~/server/models/services/email_simple";
import { FormattedMessage } from "~/server/models/templates/formatted_message";
import { globalFormatter } from "./notificationFormatters";
import { getByNotificationId as getRecipientsByNotificationId } from "~/server/db/notifications/notificationRecipients";
import { getByUserId as getUserPrefsByUserId } from "~/server/db/users/userPreferences";
import { getById as getTemplateById } from "~/server/db/templates/templates";
import { insert as insertService } from "~/server/db/services";

export const dispatch = async (noti: Notifications) => {
  const recipients: NotificationRecipients[] | null = await getRecipientsByNotificationId(noti.id);
  const template: Templates | null = await getTemplateById(noti.templateId);

  if (!template) throw Error("Unable to find matching template");
  const fms: FormattedMessage[] = await globalFormatter(
    noti,
    recipients,
    template
  );

  // send the message
  switchboard(noti, recipients, fms);
};

const switchboard = async (
  noti: Notifications,
  recipients: NotificationRecipients[],
  fms: FormattedMessage[]
) => {
  switch (noti.serviceType) {
    case "APP":
      break;
    default:
    case "EMAIL":
      sendToEmailQueue(noti, recipients, fms);
      break;
    case "PUSH":
      break;
    case "SMS":
      break;
    case "VIBER":
      break;
    case "VOICE":
      break;
    case "WHATSAPP":
      break;
  }
};

const sendToEmailQueue = async (
  noti: Notifications,
  recipients: NotificationRecipients[],
  fms: FormattedMessage[] | null
) => {
  var ccArray = recipients
    .filter((x) => x.copyType == CopyTypes.CC)
    .map((x) => x.email);
  var bccArray = recipients
    .filter((x) => x.copyType == CopyTypes.BCC)
    .map((x) => x.email);

  const request: SimpleEmailMessage = {
    bcc: bccArray,
    cc: ccArray,
    from: 
  };

  var service = await insertService(
    request,
    tenantId,
    ServiceTypes.EMAIL,
    MessageTypes.EMAIL_SIMPLE
  );
};
