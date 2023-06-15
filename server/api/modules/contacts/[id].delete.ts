import { sendError } from 'h3'
import { del } from 'nuxt/dist/app/compat/capi';
import { deleteById } from './../../../db/modules/contacts';

export default defineEventHandler(async (event) => {
	try {
        //const id = query.id as number;
        if (!event || !event.context.params?.id) {
          return sendError(
            event,
            createError({
              statusCode: 400,
              statusMessage: "id should be an integer",
            })
          );
        }
    
        const id = parseInt(event.context.params.id) as number;
    
        const contact = await deleteById(id);

        // returns 200OK by default
    
      } catch (e) {
        return sendError(
          event,
          createError({ statusCode: 500, statusMessage: "Server Error" })
        );
      }
})