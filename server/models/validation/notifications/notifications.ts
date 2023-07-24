import { CopyTypes, NotificationTypes, ServiceTypes, StatusTypes } from '@prisma/client';
import { z } from 'zod'
import { ENTITIES } from '~/server/models/enums/entities';

const recipientSchema = z.object({
    userId: z.number(),
    contactid: z.number().optional(),
    copyType: z.nativeEnum(CopyTypes),
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150),
    placeholders: z.string().min(0).max(255).optional()
})

const notificationBundle = z.object({
	notification: z.object({
        userId: z.number(),
        entity: z.nativeEnum(ENTITIES),
        entityId: z.number(),
        notificationType: z.nativeEnum(NotificationTypes),
        serviceType: z.nativeEnum(ServiceTypes),
        status: z.nativeEnum(StatusTypes),
        templateId: z.number(),
        type: z.nativeEnum(NotificationTypes), //z.string().min(3).max(50),
        useSystemPreferences: z.boolean()
    }),
	recipients: z.array(recipientSchema),
})

export {
    notificationBundle
}

export type NotificationRecipient = z.TypeOf<typeof recipientSchema>;
export type NotificationRequest = z.TypeOf<typeof notificationBundle>;