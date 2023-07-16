import { z } from "zod"
import { userRegister } from "../../models/validation/users"
import { sendError } from 'h3'
import { UsersBLL } from "~/server/bll/users/users"
import { NotificationsBLL } from "~/server/bll/notifications/notifications"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = userRegister.parse(body)
		
		if (parsedBody.password !== parsedBody.passwordConfirmation) {
			return sendError(event, createError({statusCode: 400, statusMessage: 'Password and password confirmation do not match'}))
		}

		const exists = await UsersBLL.userExists(parsedBody.email)

		if (exists) {
			return sendError(event, createError({statusCode: 409, statusMessage: 'User already exists'}))
		}
		const domain = event.node.req.headers.host
		const user = await UsersBLL.registerUser(parsedBody, domain as string)

		// send registration email
		const noti = await NotificationsBLL.sendAccountValidationNotification(user);

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