import { insert } from "~/server/db/services";
import { queueServiceJob } from "~/server/bll/queues/queue";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import { processProductTransaction } from "~/server/bll/billing/billing";
import {
  MessageTypes,
  ProviderType,
  ServiceTypes,
  Users,
} from "@prisma/client";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Products } from "~/server/models/enums/products";
import { getByName } from "~/server/db/products/products";
import { logger } from "../logging/logger";
import { getTenantByUserId } from "~/server/db/tenants/tenants";

export const queueEmail = async (
  request: any,
  messageType: MessageTypes,
  event: any,
  providerType?: ProviderType
) => {
  //const user = event.auth.user as Users;
  const user: Users = {
    id: 1,
    email: "mike.honeycomb@outlook.com",
    name: "Michael",
    surname: "Hanekom",
    UserRole: "USER",
    createdAt: Date() as unknown as Date,
    updatedAt: Date() as unknown as Date,
  };

  var tenant = await getTenantByUserId(user.id);
  if (!tenant) throw new BusinessError(Codes.E203);

  // what product is this
  logger.info(`Getting product by name:${Products.EMAIL}`);
  var product = await getByName(Products.EMAIL);
  if (product == null) throw new BusinessError(Codes.E202);

  // check volumes and credits
  var volumeCount = 0;
  volumeCount += request.to.length;
  volumeCount += request.cc.length;
  volumeCount += request.bcc.length;

  // check availability and reduce balances
  const billing = await processProductTransaction(tenant.id, product.id, volumeCount)

  // no exceptions thrown, balance available and reduced
  const email = await insert(
    request,
    tenant.id,
    ServiceTypes.EMAIL,
    messageType,
    providerType
  );
  // the service job here may be too big, so just pass the id and
  // query the Services record on the worker
  const job = await queueServiceJob(
    QueueNames.OUTBOUND_EMAIL,
    JobNames.EMAIL_SEND,
    email.id
  );

  return { email };
};

export const formatAdvancedEmail = async (
  text: string,
  html: string,
  placeholders: Map<string, string>
) => {};
