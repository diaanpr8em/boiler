import { insert as insertNotification } from "~/server/db/notifications/notifications"
import { NotificationHubBLL } from "./notificationHub";
import { TenantsBLL } from "~/server/bll/tenants/tenants";
import { SystemSettingsBLL } from "~/server/bll/system/systemSettings";
import { CopyTypes, NotificationTypes, Prisma, ServiceTypes, StatusTypes, Users } from "@prisma/client";
import { BusinessBase } from "../businessbase";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";

class Notifications extends BusinessBase<Notifications>{
    
    async sendAccountValidationNotification(user: Users){

        // get the tenant
        var tenant = await TenantsBLL.getByUserId(user.id);
        if (tenant == null) throw new BusinessError(Codes.E203);
        // get the settings
        var settings = await SystemSettingsBLL.getByTenantId(tenant.id);
        if (settings == null) throw new BusinessError(Codes.E204);

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
            },
            userId: user.id,
            retryCount: 0,
            serviceType: ServiceTypes.EMAIL,
            status: StatusTypes.NEW,
            statusMessage: "",
            templates: {},
        }
        const noti = await insertNotification(newNoti);
        NotificationHubBLL.dispatch(noti);
        return noti;
    }

    async sendNotification(model: Prisma.NotificationsCreateInput){
        const noti = await insertNotification(model);
        NotificationHubBLL.dispatch(noti);
        return noti;
    }
}

export const NotificationsBLL = new Notifications();