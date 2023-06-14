import { z } from "zod"
import { sendError } from 'h3'
import { contactUpdateSchema } from '~/server/models/modules/contacts';
import { update } from './../../../db/modules/contacts';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = contactUpdateSchema.parse(body)
		
		const contact = await update(parsedBody)

		return {
			contact
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})