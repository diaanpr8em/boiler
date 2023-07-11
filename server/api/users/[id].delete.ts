import { sendError } from 'h3'
import { deleteById } from '~/server/db/users/users';

export default defineEventHandler(async (event) => {
	try {
        if (!event || !event.context.params) {
          return sendError(
            event,
            createError({
              statusCode: 400,
              statusMessage: "id must be provided",
            })
          );
        }

        const id = parseInt(event.context.params.id);

        if (isNaN(id)) {
          return sendError(
            event,
            createError({
              statusCode: 400,
              statusMessage: "id must be a number",
            })
          );
        }
    
        await deleteById(id);

        return {
          success: true,
        }
      } catch (e) {
        return sendError(
          event,
          createError({ statusCode: 500, statusMessage: "Server Error" })
        );
      }
})