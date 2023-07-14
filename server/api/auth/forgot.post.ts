import { LinkType } from "@prisma/client"
import { z } from "zod" 
import { UniqueLinksBLL } from "~/server/bll/system/uniqueLinks"
import { UsersBLL } from "~/server/bll/users/users"
import { UniqueLinkRequest } from "~/server/models/validation/system/uniqueLinks"
import { userForgotPass } from "~/server/models/validation/users"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const parsedBody = userForgotPass.parse(body)

        const user = await UsersBLL.userExists(parsedBody.email)

        if (!user) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Password or Email is invalid'}))
        }

        // create reset unique link
        var link = await UniqueLinksBLL.addUniqueLink(new UniqueLinkRequest({
            userId: user.id,
            linkType: LinkType.RESET_PASSWORD
        }))

        // todo: send email with reset link

        return {success: true}
    } catch (e) {
        if (e instanceof z.ZodError) {
            return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
        }

        return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
    }
})