import { z } from 'zod'

const recipientSchema = z.object({
    userId: z.number(),
    contactid: z.number().optional(),
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150),
    placeholders: z.string().min(0).max(255).optional()
})

const contentSchema = z.object({
    contentType: z.enum(['HTML', 'TEXT']),
    content: z.string().min(3).max(1024000)
})

export const notificationBundle = z.object({
	notification: z.object({
        userId: z.number(),
        entity: z.string().min(3).max(50),
        entityId: z.number(),
        type: z.string().min(3).max(50),
        useSystemPreferences: z.boolean()
    }),
	recipients: z.array(recipientSchema),
    content: z.array(contentSchema)
})

export type NotificationRequest = z.TypeOf<typeof notificationBundle>;