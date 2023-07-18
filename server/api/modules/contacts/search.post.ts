import { z } from "zod"
import { sendError } from 'h3'
import { contactSearchSchema } from '~/server/models/validation/modules/contacts';
import { ContactsBLL } from '~/server/bll/modules/contacts/contacts';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = contactSearchSchema.parse(body)
		
		const result = await ContactsBLL.search(parsedBody)
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