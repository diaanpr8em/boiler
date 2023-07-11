import { sendError } from "h3";
import { getById } from "~/server/db/users/users";

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

    const user = await getById(id);

    return {
      user,
    };
  } catch (e) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "Server Error" })
    );
  }
});
