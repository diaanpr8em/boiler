import { z } from "zod"
import { sendError } from 'h3'
import { requestSchema } from '../../../../models/validation/services/sms/advanced';
import { insert } from '../../../../db/services/sms';

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = requestSchema.parse(body)
		
		const sms = await insert(parsedBody)

		return {
			sms
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
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