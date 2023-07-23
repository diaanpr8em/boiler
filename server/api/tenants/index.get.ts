import { z } from 'zod'
import { TenantsBLL } from '~/server/bll/tenants/tenants'

export default defineEventHandler(async (event) => {

    try {
        const tenants = await TenantsBLL.getAll()

        return {
            tenants
        }
    } catch (e) {
        if (e instanceof z.ZodError) {
            return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
        }

        return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
    }
})