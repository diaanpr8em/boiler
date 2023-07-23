import { z } from "zod"
import { sendError } from 'h3'
import { SMSBLL } from "~/server/bll/services/sms";
import { BusinessError } from "~/server/models/exceptions/BusinessError";
import { requestSchema } from "~/server/models/validation/services/sms/advanced";
import { MessageTypes } from "@prisma/client";

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
    // switch between version
    //const route = useRoute();
    //if (route.params.ver != "1" ) return;

    // map the custom body into a generic body
    const parsedBody = requestSchema.parse(body);
    var sms = await SMSBLL.queueSMS(parsedBody, MessageTypes.SMS_ADVANCED, event)

		return {
			sms
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
{
  "messages": [
    {
      "destinations": [
        {
          "to": "41793026727"
        }
      ],
      "from": "InfoSMS",
      "text": "This is a sample message"
      "reference": "reference-1234"
    }
  ]
}

Example Response:
{
  "bulkId": "2034072219640523072",
  "reference": "reference-1234"
  "messages": [
    {
      "messageId": "2250be2d4219-3af1-78856-aabe-1362af1edfd2",
      "status": {
        "description": "Message sent to next instance",
        "groupId": 1,
        "groupName": "PENDING",
        "id": 26,
        "name": "MESSAGE_ACCEPTED"
      },
      "to": "41793026727"
    }
  ]
}
*/