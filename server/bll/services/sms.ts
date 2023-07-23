import { ServicesBLL } from "~/server/bll/services/services";
import { queueServiceJob } from "~/server/bll/queues/queue";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import { BillingBLL } from "~/server/bll/billing/billing";
import { SMSMessage } from "~/server/models/services/sms";
import {
  MessageTypes,
  ProviderType,
  ServiceTypes,
  Users
} from "@prisma/client";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";
import { Products } from "~/server/models/enums/products";
import { ProductsBLL } from "~/server/bll/products/products";
import { ProductStockBLL } from "~/server/bll/products/productStock";
import { TenantsBLL } from "~/server/bll/tenants/tenants";
import { ServiceRequest } from "~/server/models/validation/services/services";

class SMS {

  queueSMS = async (
    request: SMSMessage,
    messageType: MessageTypes,
    event: any,
    providerType?: ProviderType
  ) => {
    // who is this? Diaan to show usage of auth here
    const user: Users = {
      id: 1,
      email: "mike.honeycomb@outlook.com",
      name: "Michael",
      surname: "Hanekom",
      userRole: "USER",
      createdAt: Date() as unknown as Date,
      updatedAt: Date() as unknown as Date
    };

    var tenant = await TenantsBLL.getByUserId(user.id);
    if (!tenant) throw new BusinessError(Codes.E203);

    // what product is this
    var product = await ProductsBLL.getByName(Products.SMS.toString());
    if (product == null) throw new BusinessError(Codes.E202);

    // check volumes and credits
    var volumeCount = 0;
    request.messages.forEach(function (msg) {
      volumeCount += msg.destinations.length;
    });

    // check availability and reduce balances
    const billing = await BillingBLL.processProductTransaction(
      tenant.id,
      product.id,
      volumeCount
    );

    // send if credits
    let sRequest: ServiceRequest = {
      tenantId: tenant.id,
      userId: user.id,
      serviceType: ServiceTypes.SMS,
      messageType: messageType,
      providerType: providerType == null ? ProviderType.INFOBIP : providerType,
      status: "NEW",
      request: JSON.stringify(request),
      response: "",
      jobId: "",
      jobStatus: "NEW",
      providerRequest: "",
      providerResponse: "",
      retryCount: 0,
      statusMessage: ""
    };
    const sms = await ServicesBLL.insert(sRequest);
    const job = await queueServiceJob(
      QueueNames.OUTBOUND_SMS,
      JobNames.SMS_SEND,
      sms.id
    );

    return { sms };
  };
}

export const SMSBLL = new SMS();
