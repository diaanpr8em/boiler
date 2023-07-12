import { insert as insertNotification } from "~/server/db/notifications/notifications"
import { NotificationHub as NotificationHubBLL } from "./notificationHub";
import { Tenants as TenantsBLL } from "~/server/bll/tenants/tenants";
import { SystemSettings as SystemSettingsBLL } from "~/server/bll/system/systemSettings";
import { CopyTypes, NotificationTypes, Prisma, ServiceTypes, StatusTypes, Users } from "@prisma/client";
import { BusinessBase } from "../businessbase";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";

export class Notifications extends BusinessBase<Notifications>{
    
    async sendAccountValidationNotification(user: Users){

        // get the tenant
        var tenant = await new TenantsBLL().getByUserId(user.id);
        if (tenant == null) throw new BusinessError(Codes.E203);
        // get the settings
        var settings = await new SystemSettingsBLL().getByTenantId(tenant.id);
        if (settings == null) throw new BusinessError(Codes.E204);
        var baseUrl

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
                        base_url: 
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
        new NotificationHubBLL().dispatch(noti);
        return noti;
    }

    async sendNotification(model: Prisma.NotificationsCreateInput){
        const noti = await insertNotification(model);
        new NotificationHubBLL().dispatch(noti);
        return noti;
    }
}