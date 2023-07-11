import {
  CopyTypes,
  MessageTypes,
  NotificationRecipients,
  Notifications,
  ServiceTypes,
  Templates,
  Tenants
} from "@prisma/client";
import { EmailMessage as SimpleEmailMessage } from "~/server/models/services/email_simple";
import { FormattedMessage } from "~/server/models/templates/formatted_message";
import { globalFormatter } from "./notificationFormatters";
import { getByNotificationId as getRecipientsByNotificationId } from "~/server/db/notifications/notificationRecipients";
import { getByUserId as getUserPrefsByUserId } from "~/server/db/users/userPreferences";
import { getById as getTemplateById } from "~/server/db/templates/templates";
import { insert as insertService } from "~/server/db/services";
import { getTenantByUserId } from "~/server/db/tenants/tenants";

export const dispatch = async (noti: Notifications) => {
  const recipients: NotificationRecipients[] | null = await getRecipientsByNotificationId(noti.id);
  const template: Templates | null = await getTemplateById(noti.templateId);
  const tenant: Tenants | null = await getTenantByUserId(noti.userId);

  if (!template) throw Error("Unable to find matching template");
  const fms: FormattedMessage[] = await globalFormatter(
    noti,
    recipients,
    template
  );

  // send the message
  switchboard(noti, recipients, fms, tenant);
};

const switchboard = async (noti: Notifications, recipients: NotificationRecipients[], fms: FormattedMessage[], tenant: Tenants | null) => {
  switch (noti.serviceType) {
    case "APP":
      break;
    default:
    case "EMAIL":
      sendToEmailQueue(noti, recipients, fms, tenant);
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

const sendToEmailQueue = async (noti: Notifications, recipients: NotificationRecipients[], fms: FormattedMessage[] | null, tenant: Tenants | null) => {
  let ccArray = recipients
    .filter((x) => x.copyType == CopyTypes.CC)
    .map((x) => x.email);
  let bccArray = recipients
    .filter((x) => x.copyType == CopyTypes.BCC)
    .map((x) => x.email);

  // this will dedupe an array and also remove undefined's
  ccArray = [...new Set(ccArray)].filter(x => x);
  bccArray = [...new Set(bccArray)].filter(x => x);

  const settings: await 

  const request: SimpleEmailMessage = {
    bcc: bccArray,
    cc: ccArray,
    from: 
  };

  var service = await insertService(
    request,
    tenant.id,
    ServiceTypes.EMAIL,
    MessageTypes.EMAIL_SIMPLE
  );
};
