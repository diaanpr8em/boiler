import { prisma } from "../prismaConnection";
import { z } from "zod";
import { notificationBundle } from "~/server/models/validation/modules/notifications";

type NotificationRequest = z.TypeOf<typeof notificationBundle>;

export const insertBundle = (notificationBundle: NotificationRequest) => {
  return prisma.notifications.create({
    data: {
      entity: notificationBundle.notification.entity,
      entityId: notificationBundle.notification.entityId,
      type: notificationBundle.notification.type,
      status: "NEW",
      useSystemPreferences:
        notificationBundle.notification.useSystemPreferences,
      userId: notificationBundle.notification.userId,
      NotificationRecipients: {
        create: notificationBundle.recipients,
      },
      NotificationContent: {
        create: notificationBundle.content,
      },
    },
  });
  /*data: {
            entity: notificationBundle.notification.entity,
            entityId: notificationBundle.notification.entityId,
            NotificationRecipients: {
                createMany: {
                    data: notificationBundle.recipients
                }
            },
            NotificationContent: {
                createMany: {
                    data: notificationBundle.content
                }
            },
            type: notificationBundle.notification.type,
            status: "NEW",
            useSystemPreferences: notificationBundle.notification.useSystemPreferences,
            userId: notificationBundle.notification.userId
		}
	})*/
};
