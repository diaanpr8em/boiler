import { z } from "zod"
import { sendError } from 'h3'
import { NotificationsBLL} from "~/server/bll/notifications/notifications"
import { notificationBundle } from '~/server/models/validation/notifications/notifications';


export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = notificationBundle.parse(body)
		
		const notification = await NotificationsBLL.insert(parsedBody)

		return {
			notification
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})