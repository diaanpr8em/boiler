import { z } from "zod"
import { sendError } from 'h3'
import { contactGroupInsertSchema } from "~/server/models/validation/modules/contactGroups";
import { insert } from "~/server/db/modules/contactGroups";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = contactGroupInsertSchema.parse(body)
		
		const contactGroup = await insert(parsedBody)

		return {
			contactGroup
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})