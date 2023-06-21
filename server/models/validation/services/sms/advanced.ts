import { z } from 'zod'

const destinationSchema = z.object({
    to: z.string().min(3).max(50)
})

const messageSchema = z.object({
    destinations: z.array(destinationSchema),
    from: z.string().min(3).max(50),
    text: z.string().min(0).max(150),
    reference: z.string().min(0).max(50)
})

const requestSchema = z.object({
    messages: z.array(messageSchema)
})

export { requestSchema }
