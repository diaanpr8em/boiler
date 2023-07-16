import { insert } from "~/server/db/services/services";
import { queueServiceJob } from "~/server/bll/queues/queue";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import { hasSufficientBalanceAvailable, reduceBalance } from "~/server/bll/billing/billing";
import { SMSMessage } from "~/server/models/services/sms";
import { MessageTypes, ServiceTypes, Users } from '@prisma/client';
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Products } from "~/server/models/enums/products";
import { getByName } from "~/server/db/products/products";
import { getTenantByUserId } from "~/server/db/tenants/tenants";

export const processSMS = async (body: SMSMessage, messageType: MessageTypes, event: any) => {
  // who is this? Diaan to show usage of auth here
  const user: Users = {
    id: 1,
    email: "mike.honeycomb@outlook.com",
    name: "Michael",
    surname: "Hanekom",
    UserRole: "USER",
    createdAt: Date() as unknown as Date,
    updatedAt: Date() as unknown as Date
  };

  var tenant = await getTenantByUserId(user.id);
  if (!tenant) throw new BusinessError(Codes.E203);
  
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
  const sms = await insert(body, tenant.id, ServiceTypes.SMS, messageType);
  const billing = await reduceBalance(user.id, product?.id, volumeCount);
  const job = await queueServiceJob(QueueNames.OUTBOUND_SMS, JobNames.SMS_SEND, sms.id);

  return { sms };
};
