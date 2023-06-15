import { sendError } from 'h3'
import { deleteById } from './../../../db/modules/contacts';

export default defineEventHandler(async (event) => {
	const query = await getQuery(event)

	try {
		const id = query.id as number;
        if (!Number.isInteger(id)){
            throw createError({
                statusCode: 400,
                statusMessage: "id should be an integer"
            })
        }
		
		const contact = await deleteById(id)

		return {
			contact
		}
	} catch (e) {
		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})