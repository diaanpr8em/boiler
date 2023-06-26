import { insert } from "~/server/db/services";
import { queueServiceJob } from "~/server/bll/queues/queue";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import { hasSufficientBalanceAvailable, reduceBalance } from "~/server/bll/billing/billing";
import { SMSAdvancedMessage } from "~/server/models/services/sms";
import { ServiceTypes, Users } from '@prisma/client';
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Products } from "~/server/models/enums/products";
import { getByName } from "~/server/db/products/products";

export const processSMS = async (body: SMSAdvancedMessage) => {
  // who is this? Diaan to show usage of auth here
  const user: Users = {
    id: 1,
    email: "mike.honeycomb@outlook.com",
    name: "Michael",
    surname: "Hanekom",
    currency: "ZAR",
    createdAt: Date() as unknown as Date,
    updatedAt: Date() as unknown as Date
  };
  
  // what product is this
  var product = await getByName(Products.SMS.toString());
  if (product == null) throw new BusinessError(Codes.E202);

  // check volumes and credits
  var volumeCount = 0;
  body.messages.forEach(function (msg) {
    volumeCount += msg.destinations.length
  });
    const hasBalance = await hasSufficientBalanceAvailable(user.id, product.id, volumeCount);
  if (!hasBalance){
    throw new BusinessError(Codes.E200);
  }

  // send if credits
  const sms = await insert(body, ServiceTypes.SMS);
  const billing = await reduceBalance(user.id, Products.SMS, volumeCount);
  const job = await queueServiceJob(QueueNames.OUTBOUND_SMS, JobNames.SMS_SEND, sms);

  return { sms };
};
