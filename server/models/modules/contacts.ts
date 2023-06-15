import { z } from 'zod'

const contactInsertSchema = z.object({
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150)
})

const contactUpdateSchema = z.object({
    id: z.number(),
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150)
})

const contactSearchSchema = z.object({
    searchTerm: z.string().max(150),
    rows: z.number(),
    page: z.number()
})
export { contactInsertSchema, contactSearchSchema, contactUpdateSchema }