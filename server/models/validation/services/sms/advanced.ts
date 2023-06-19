import { z } from 'zod'

const destinationSchema = z.object({
    to: z.array(z.string().min(3).max(50))
})

const messageSchema = z.object({
    destinations: destinationSchema,
    from: z.string().min(3).max(50),
    text: z.string().min(0).max(150),
    reference: z.string().min(0).max(50)
})

const requestSchema = z.object({
    messages: messageSchema
})

export { requestSchema }
