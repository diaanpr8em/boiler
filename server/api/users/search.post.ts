import { z } from 'zod'
import { UsersBLL } from '~/server/bll/users/users'
import { userSearchSchema } from '~/server/models/validation/users'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const parsedBody = userSearchSchema.parse(body)

        const result = await UsersBLL.search(parsedBody)
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