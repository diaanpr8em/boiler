import { z } from 'zod'
import { backendRegisterUser } from '~/server/db/users/users'
import { backendRegister } from '~/server/models/validation/users'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const parsedBody = backendRegister.parse(body)

        // TODO: no email validation will be done here
        const user = await backendRegisterUser(parsedBody)

        return {
            user
        }
    } catch (e) {
        if (e instanceof z.ZodError) {
            return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
        }

        return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
    }
})