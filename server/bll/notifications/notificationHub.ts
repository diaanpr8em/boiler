import { BusinessBase } from "../businessbase";
import { CopyTypes, MessageTypes, NotificationRecipients, Notifications, ServiceTypes, SystemSettings, Templates, Tenants } from "@prisma/client";
import { EmailMessage as SimpleEmailMessage } from "~/server/models/services/email_simple";
import { FormattedMessage } from "~/server/models/templates/formatted_message";
import { GlobalFormatter } from "./notificationFormatters";
import { NotificationRecipientsBLL } from "~/server/bll/notifications/notificationRecipients";
import { ServicesBLL } from "~/server/bll/services/services";
import { SystemSettingsBLL } from "~/server/bll/system/systemSettings"
import { TenantsBLL } from "~/server/bll/tenants/tenants";
import { TemplatesBLL } from "~/server/bll/templates/templates"
class NotificationHub extends BusinessBase<NotificationHub> {
  
  async dispatch(noti: Notifications) : Promise<void>{
    const recipients: NotificationRecipients[] = await NotificationRecipientsBLL.getByNotificationId(noti.id);
    const template: Templates | null = await TemplatesBLL.getById(noti.templateId);
    const tenant: Tenants | null = await TenantsBLL.getByUserId(noti.userId);
  
    if (!template) throw Error("Unable to find matching template");
    const fms: FormattedMessage = await new GlobalFormatter().format(noti, recipients, template);
  
    // send the message
    if (tenant == null) throw Error("Unable to determine tenant");
    this.switchboard(noti, recipients, fms, tenant);
  }

  async switchboard(noti: Notifications, recipients: NotificationRecipients[], fms: FormattedMessage, tenant: Tenants) : Promise<void>{
    switch (noti.serviceType) {
      case "APP":
        break;
      default:
      case "EMAIL":
        this.sendToEmailQueue(noti, recipients, fms, tenant);
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
  }

  async sendToEmailQueue(noti: Notifications, recipients: NotificationRecipients[], fms: FormattedMessage | null, tenant: Tenants) : Promise<void>{
    let toArray = recipients
      .filter((x) => x.copyType == CopyTypes.TO)
      .map((x) => x.email);
    let ccArray = recipients
      .filter((x) => x.copyType == CopyTypes.CC)
      .map((x) => x.email);
    let bccArray = recipients
      .filter((x) => x.copyType == CopyTypes.BCC)
      .map((x) => x.email);

    // this will dedupe an array and also remove undefined's
    toArray = [...new Set(toArray)].filter(x => x);
    ccArray = [...new Set(ccArray)].filter(x => x);
    bccArray = [...new Set(bccArray)].filter(x => x);

    const settings: SystemSettings[] | null = await SystemSettingsBLL.getByTenantId(tenant.id);
    let emailFrom = settings
      .find((x) => x.module == MODULES.NOTIFICATIONS && x.setting == SETTINGS.NOTIFICATIONS_EMAIL_FROM)
      ?.value;
    if (!emailFrom) throw new Error("Unable to determine from email address");

    const request: SimpleEmailMessage = {
      bcc: bccArray,
      cc: ccArray,
      from: emailFrom,
      to: toArray,
      subject: fms?.subject,
      html: fms?.htmlMessage,
      text: fms?.textMessage,
      templateId: noti.templateId
    };

    var service = await ServicesBLL.insert(
      request,
      tenant.id,
      ServiceTypes.EMAIL,
      MessageTypes.EMAIL_SIMPLE
    );
  }
}

export const NotificationHubBLL = new NotificationHub();