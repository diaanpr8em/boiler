import { z } from 'zod'
import { TenantsBLL } from '~/server/bll/tenants/tenants'
import { tenantSearchSchema } from '~/server/models/validation/tenants'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const parsedBody = tenantSearchSchema.parse(body)

        const result = await TenantsBLL.search(parsedBody)
        const response = {
            page: parsedBody.page,
            rows: parsedBody.rows,
            ...result
        }
        return response
    } catch (e) {
        if (e instanceof z.ZodError) {
            return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
        }

        return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
    }
})