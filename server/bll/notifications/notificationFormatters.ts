import { NotificationRecipients, Notifications, Templates } from "@prisma/client";
import { logger } from "../logging/logger";
import ejs from "ejs"
import { FormattedMessage } from "~/server/models/templates/formatted_message";

export const globalFormatter = async(noti: Notifications, recipients: NotificationRecipients[] | null, template: Templates | null) => {
    if (noti.templateId <= 0) throw new Error("No template set for this notification");
    if (recipients == null) throw new Error("No NotificationRecipients entries for this notification");
    if (template == null) throw new Error("No template data")

    var fms = new Array<FormattedMessage>();
    for(const rec of recipients)
    {
        // we only format messages for TO recipients, the rest get it as is
        if (rec.copyType != "TO") continue;
        // the sample placeholders for each template is in the Templates table
        var mesgs = {} as FormattedMessage;
        mesgs.htmlMessage = ejs.render(template.htmlBody, { data: rec.placeholders });
        mesgs.textMessage = ejs.render(template.textBody, { data: rec.placeholders });
        fms.push(mesgs);
    }

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