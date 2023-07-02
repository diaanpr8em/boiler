import { z } from "zod"
import { sendError } from 'h3'
import { queueEmail } from "~/server/bll/services/email";
import { BusinessError } from "~/server/models/exceptions/BusinessError";
import { messageSchema } from "~/server/models/validation/services/email/simple";
import { MessageTypes } from "@prisma/client";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
    // switch between version
    //const route = useRoute();
    //if (route.params.ver != "1" ) return;

    // map the custom body into a generic body
    const parsedBody = messageSchema.parse(body);
    var email = await queueEmail(parsedBody, MessageTypes.EMAIL_SIMPLE, event)

		return {
			email
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

    if (e instanceof BusinessError){
      return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e)}))
    }

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})

// Single and batch sending features including contacts and groups
/* 
Example Request:


Example Response:
{
  "bulkId": "snxemd8u52v7v84iiu69",
  "messages": [
    {
      "to": "john.smith@somecompany.com",
      "messageId": "jgzra46v9zi1ztvd62t5",
      "status": {
        "groupId": 1,
        "groupName": "PENDING",
        "id": 26,
        "name": "PENDING_ACCEPTED",
        "description": "Message accepted, pending for delivery."
      }
    }
  ]
}
*/