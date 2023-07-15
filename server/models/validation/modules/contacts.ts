import { z } from 'zod'

export const contactInsertSchema = z.object({
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150),
    tenantId: z.number().optional(),
})

export const contactUpdateSchema = z.object({
    id: z.number(),
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150),
})

export const contactSearchSchema = z.object({
    searchTerm: z.string().max(150),
    rows: z.number(),
    page: z.number(),
    sortBy: z.array(
        z.object({
            key: z.string().max(150),
            order: z.string().max(4),
        })
    ).optional(),
})
export type ContactsInsertRequest = z.TypeOf<typeof contactInsertSchema>;
export type ContactsUpdateRequest = z.TypeOf<typeof contactUpdateSchema>;
export type ContactsSearchRequest = z.TypeOf<typeof contactSearchSchema>;