import { z } from 'zod'

const messageSchema = z.object({
    from: z.string().min(3).max(50),
    to: z.array(z.string().min(3).max(50)),
    cc: z.array(z.string().min(3).max(50)),
    bcc: z.array(z.string().min(3).max(50)),
    subject: z.string().min(1).max(255),
    html: z.string().min(0).max(8192),
    text: z.string().min(0).max(2048),
    reference: z.string().min(0).max(50),
    templateId: z.number().min(0).max(100000)
})

export { messageSchema }
