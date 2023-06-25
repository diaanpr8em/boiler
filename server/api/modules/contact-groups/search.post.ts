import { z } from "zod"
import { sendError } from 'h3'
import { contactGroupSearchSchema } from "~/server/models/validation/modules/contactGroups";
import { search } from "~/server/db/modules/contactGroups";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = contactGroupSearchSchema.parse(body)
		
		const result = await search(parsedBody)
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