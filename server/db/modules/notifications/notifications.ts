import { prisma } from "../../prismaConnection";
import { z } from "zod";
import { NotificationRequest } from "~/server/models/validation/modules/notifications";

class Notifications {

  insertBundle(bundle: NotificationRequest){
    return prisma.notifications.create({
      data: {
        entity: bundle.notification.entity,
        entityId: bundle.notification.entityId,
        type: bundle.notification.type,
        status: "NEW",
        useSystemPreferences:
          bundle.notification.useSystemPreferences,
        userId: bundle.notification.userId,
        NotificationRecipients: {
          create: bundle.recipients,
        },
        NotificationContent: {
          create: bundle.content,
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
}

export const NotificationsDAL = new Notifications();


