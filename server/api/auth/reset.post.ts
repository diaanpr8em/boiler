import { LinkType } from "@prisma/client"
import { z } from "zod"
import { UniqueLinksBLL } from "~/server/bll/system/uniqueLinks"
import { UsersBLL } from "~/server/bll/users/users"
import { userResetPass } from "~/server/models/validation/users"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const parsedBody = userResetPass.parse(body)

        const uniqueLink = await UniqueLinksBLL.getUniqueLinkByLinkIdAndType(parsedBody.linkId, LinkType.RESET_PASSWORD)

        if (!uniqueLink || uniqueLink.expiry < new Date()) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Link is invalid or expired'}))
        }

        const user = await UsersBLL.getUserById(uniqueLink.userId)

        if (!user) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Password or Email is invalid'}))
        }

        if (parsedBody.password !== parsedBody.passwordConfirmation) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Password and password confirmation do not match'}))
        }

        const userUpdated = await UsersBLL.resetPassword(user.email, parsedBody.password)

        return {success: true, user: userUpdated}
    } catch (e) {
        if (e instanceof z.ZodError) {
            return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
        }

        return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
    }
})