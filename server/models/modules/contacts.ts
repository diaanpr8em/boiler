import { z } from 'zod'

const contactSchema = z.object({
    fullName: z.string().min(3).max(150),
    email: z.string().email(),
    mobile: z.string().min(0).max(50),
    handle: z.string().min(0).max(150)
})

export { contactSchema }