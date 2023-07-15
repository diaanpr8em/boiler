import { z } from 'zod'

export const contactGroupInsertSchema = z.object({
    name: z.string().max(191),
    description: z.string().max(191),
    tenantId: z.number()
})

export const contactGroupUpdateSchema = z.object({
    id: z.number(),
    name: z.string().max(191),
    description: z.string().max(191),
})

export const contactGroupSearchSchema = z.object({
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

export type ContactGroupsInsertRequest = z.TypeOf<typeof contactGroupInsertSchema>;
export type ContactGroupsUpdateRequest = z.TypeOf<typeof contactGroupUpdateSchema>;
export type ContactGroupsSearchRequest = z.TypeOf<typeof contactGroupSearchSchema>;