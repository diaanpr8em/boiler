import { z } from 'zod'

const destination = z.object({
    to: z.string().email().min(3).max(50),
    placeholders: z.string().min(3).max(150).optional()
})

const messageSchema = z.object({
    from: z.string().min(3).max(50),
    to: z.array(destination),
    cc: z.array(destination),
    bcc: z.array(destination),
    subject: z.string().min(1).max(255),
    html: z.string().min(0).max(8192),
    text: z.string().min(0).max(2048),
    reference: z.string().min(0).max(50),
    templateId: z.number().min(0).max(100000)
})


export { messageSchema }
