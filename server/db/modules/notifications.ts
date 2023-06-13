import { z } from "zod"
import { prisma } from "../prismaConnection"
import { notificationBundle } from "~/server/models/modules/notifications"

type NotificationRequest = z.TypeOf<typeof notificationBundle>;

export const insertBundle =  (notificationBundle: NotificationRequest) => {
	prisma.notifications.create({
		data: {
			entity: notificationBundle.notification.entity,
            NotificationRecipients: {
                createMany: {  
                    data: notificationBundle.recipients
                }
            },
            NotificationContent: { 
                createMany: {
                    data: notificationBundle.content
                }
            }
		}
	})
}