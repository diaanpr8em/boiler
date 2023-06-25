import { z } from 'zod'

const contactGroupInsertSchema = z.object({
    name: z.string().max(191),
    description: z.string().max(191),
    tenantId: z.number()
})

const contactGroupUpdateSchema = z.object({
    id: z.number(),
    name: z.string().max(191),
    description: z.string().max(191),
})

const contactGroupSearchSchema = z.object({
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
export { 
    contactGroupInsertSchema, 
    contactGroupSearchSchema, 
    contactGroupUpdateSchema 
}