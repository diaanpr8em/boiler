import { BusinessBase } from "../businessbase";
import {
  CopyTypes,
  NotificationRecipients,
  Notifications,
  Templates
} from "@prisma/client";
import { logger } from "../logging/logger";
import ejs from "ejs";
import { FormattedMessage } from "~/server/models/templates/formatted_message";

export class GlobalFormatter extends BusinessBase<GlobalFormatter> {
  
  async format(
    noti: Notifications,
    recipients: NotificationRecipients[] | null,
    template: Templates | null
  ) {
    if (noti.templateId <= 0) throw new Error("No template set for this notification");
    if (recipients == null) throw new Error("No NotificationRecipients entries for this notification");
    if (template == null) throw new Error("No template data");

    let fms: FormattedMessage;
    fms = {} as FormattedMessage;
    // only format the first TO addy (if there are more, somethings wrong)
    let toAddy: NotificationRecipients | undefined;
    toAddy = recipients.find((x) => x.copyType == CopyTypes.TO);
    if (!toAddy) throw new Error("No TO address has been set");

    // the sample placeholders for each template is in the Templates table
    fms.htmlMessage = ejs.render(template.htmlBody, {
      data: toAddy.placeholders
    });
    fms.textMessage = ejs.render(template.textBody, {
      data: toAddy.placeholders
    });

    return fms;
    // e.g. code
    // JSON
    /*
        [{
            "name": "person1",
            "orders": [{
                    "orderNo": 1,
                    "productName": "Some product",
                    "price": 100
                },
                {
                    "orderNo": 2,
                    "productName": "Some other product",
                    "price": 200
                }
            ]
        },
        {
            "name": "person2",
            "orders": [{
                    "orderNo": 3,
                    "productName": "Some product",
                    "price": 100
                },
                {
                    "orderNo": 4,
                    "productName": "Some other product",
                    "price": 200
                }
            ]
        }]
    */

    // HTML
    /*
    <html>
    <head>
      <title>Email Template</title>
    </head>
    <body>
      <% for (const person of data) { %>
        <h2>Name: <%= person.name %></h2>
        <ul>
          <% for (const order of person.orders) { %>
            <li>
              Order No: <%= order.orderNo %><br>
              Product Name: <%= order.productName %><br>
              Price: $<%= order.price %>
            </li>
          <% } %>
        </ul>
        <hr>
      <% } %>
    </body>
    </html>
    */
  }
}
