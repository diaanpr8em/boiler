import { insert } from "~/server/db/services";
import { queueServiceJob } from "~/server/bll/queues/queue";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import {
  hasSufficientBalanceAvailable,
  reduceBalance,
} from "~/server/bll/billing/billing";
import { EmailMessage } from "~/server/models/services/email_simple";
import { ServiceTypes, Users } from "@prisma/client";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Products } from "~/server/models/enums/products";
import { getByName } from "~/server/db/products/products";

export const queueSimpleEmail = async (body: EmailMessage) => {
  // who is this? Diaan to show usage of auth here
  const user: Users = {
    id: 1,
    email: "mike.honeycomb@outlook.com",
    name: "Michael",
    surname: "Hanekom",
    currency: "ZAR",
    createdAt: Date() as unknown as Date,
    updatedAt: Date() as unknown as Date,
  };

  // what product is this
  var product = await getByName(Products.EMAIL);
  if (product == null) throw new BusinessError(Codes.E202);

  // check volumes and credits
  var volumeCount = 0;
  volumeCount += body.to.length;
  volumeCount += body.cc.length;
  volumeCount += body.bcc.length;

  const hasBalance = await hasSufficientBalanceAvailable(
    user.id,
    product.id,
    volumeCount
  );
  if (!hasBalance) {
    throw new BusinessError(Codes.E200);
  }

  // send if credits
  const email = await insert(body, ServiceTypes.EMAIL);
  const billing = await reduceBalance(user.id, product.id, volumeCount);
  const job = await queueServiceJob(
    QueueNames.OUTBOUND_EMAIL,
    JobNames.EMAIL_SEND,
    email
  );

  return { email };
};

export const formatAdvancedEmail = async(text: string, html: string, placeholders: Map<string, string> ) => {

}
