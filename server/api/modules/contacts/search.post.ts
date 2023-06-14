import { z } from "zod"
import { sendError } from 'h3'
import { contactSearchSchema } from '~/server/models/modules/contacts';
import { search } from './../../../db/modules/contacts';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = contactSearchSchema.parse(body)
		
		const result = await search(parsedBody)

		return {
			result
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})