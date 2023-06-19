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