import { z } from "zod"
import { sendError } from 'h3'
import { contactInsertSchema } from '~/server/models/validation/modules/contacts';
import { insert } from './../../../db/modules/contacts';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = contactInsertSchema.parse(body)

		// this is only necessary if user is not an admin and created from client
		const { auth } = event.context
		if (!parsedBody.tenantId && auth.role == 'USER') {
			parsedBody.tenantId = auth.tenant.id
		}

		if (!parsedBody.tenantId) sendError(event, createError({statusCode: 400, statusMessage: 'Tenant ID is required'}))

		const contact = await insert(parsedBody)

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