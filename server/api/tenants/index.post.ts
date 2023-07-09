import { z } from 'zod'
import { insert } from '~/server/db/tenants/tenants'
import { tenantInsertSchema } from '~/server/models/validation/tenants'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const parsedBody = tenantInsertSchema.parse(body)

        const tenant = await insert(parsedBody)

        return {
            tenant
        }
    } catch (e) {
        if (e instanceof z.ZodError) {
            return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
        }

        return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
    }
})