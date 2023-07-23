import { queueServiceJob } from "~/server/bll/queues/queue";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import {
  MessageTypes,
  ProviderType,
  ServiceTypes,
  Users,
} from "@prisma/client";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Products } from "~/server/models/enums/products";
import { ProductsBLL } from "~/server/bll/products/products";
import { logger } from "../logging/logger";
import { TenantsBLL } from "~/server/bll/tenants/tenants";
import { BillingBLL } from "../billing/billing";
import { ServicesBLL } from "./services";
import { ServiceRequest } from '~/server/models/validation/services/services';

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
    userRole: "USER",
    createdAt: Date() as unknown as Date,
    updatedAt: Date() as unknown as Date,
  };

  var tenant = await TenantsBLL.getByUserId(user.id);
  if (!tenant) throw new BusinessError(Codes.E203);

  // what product is this
  logger.info(`Getting product by name:${Products.EMAIL}`);
  var product = await ProductsBLL.getByName(Products.EMAIL);
  if (product == null) throw new BusinessError(Codes.E202);

  // check volumes and credits
  var volumeCount = 0;
  volumeCount += request.to.length;
  volumeCount += request.cc.length;
  volumeCount += request.bcc.length;

  // check availability and reduce balances
  const billing = await BillingBLL.processProductTransaction(tenant.id, product.id, volumeCount)

  // no exceptions thrown, balance available and reduced
  let sRequest: ServiceRequest = {
    tenantId: tenant.id,
    userId: user.id,
    serviceType: ServiceTypes.EMAIL,
    messageType: messageType,
    providerType: (providerType == null) ? ProviderType.INFOBIP : providerType,
    status: "NEW",
    request: JSON.stringify(request),
    response: "",
    jobId: "",
    jobStatus: "NEW",
    providerRequest: "",
    providerResponse: "",
    retryCount: 0,
    statusMessage: ""
  }
  const email = await ServicesBLL.insert(sRequest);

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
