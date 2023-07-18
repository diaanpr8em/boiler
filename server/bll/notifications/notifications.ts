import { NotificationsDAL } from "~/server/db/notifications/notifications"
import { NotificationHubBLL } from "./notificationHub";
import { TenantsBLL } from "~/server/bll/tenants/tenants";
import { SystemSettingsBLL } from "~/server/bll/system/systemSettings";
import { CopyTypes, NotificationTypes, ServiceTypes, StatusTypes, Users } from "@prisma/client";
import { BusinessBase } from "../businessBase";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Notifications as pNotifications } from "@prisma/client";
import { prisma } from "~/server/db/prismaConnection";
import { NotificationRequest } from "~/server/models/validation/notifications/notifications";

class Notifications extends BusinessBase<pNotifications>{
    
    constructor() {
        super(prisma.notifications);
    }

    async sendAccountValidationNotification(user: Users){

        // get the tenant
        var tenant = await TenantsBLL.getByUserId(user.id);
        if (tenant == null) throw new BusinessError(Codes.E203);
        // get the settings
        var settings = await SystemSettingsBLL.getByTenantId(tenant.id);
        if (settings == null) throw new BusinessError(Codes.E204);

        let newNoti: NotificationRequest;
        newNoti = {
            notification: {
                entity: ENTITIES.USER,
                entityId: user.id,
                notificationType: NotificationTypes.ACCOUNT_VALIDATION,
                serviceType: ServiceTypes.EMAIL,
                status: StatusTypes.NEW,
                templateId: settings.templates.accountValidation,
                type: NotificationTypes.ACCOUNT_VALIDATION,
                userId: user.id,
                useSystemPreferences: false
            },
            recipients: [
                {
                    copyType: CopyTypes.TO,
                    email: user.email,
                    handle: "",
                    fullName: `${user.name} ${user.surname}`,
                    mobile: "",
                    userId: user.id,
                    placeholders: JSON.stringify({
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        baseUrl: `https://${tenant.domain}`,
                        confirmationLink: "", // excluding base url e.g. /confirm/213123123:123123123
                        unsubscribeLink: "", // excluding base url e.g. /unsubscribe/121212:12121212
                        tenantName: tenant.name
                    })
                }
            ]
        };
        const noti = await NotificationsDAL.insert(newNoti);
        NotificationHubBLL.dispatch(noti);
        return noti;
    }

    async sendNotification(model: NotificationRequest){
        const noti = await NotificationsDAL.insert(model);
        NotificationHubBLL.dispatch(noti);
        return noti;
    }
}

export const NotificationsBLL = new Notifications();