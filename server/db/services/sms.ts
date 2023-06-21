import { z } from "zod";
import { JobStatus, ServiceTypes, Services, StatusTypes } from "@prisma/client";
import { prisma } from "../prismaConnection";
import { requestSchema } from "~/server/models/validation/services/sms/advanced";

type AdvancedRequestSchema = z.TypeOf<typeof requestSchema>;

export const insert = (insertSchema: AdvancedRequestSchema) => {
  // queue the job
  // insert the data
  var record = prisma.services.create({
    data: {
      jobStatus: "NEW",
      type: "SMS",
      request: insertSchema.toString(),
      response: "",
      providerRequest: "",
      providerResponse: "",
      userId: 1,
      status: "NEW",
    },
  });

  return record;
};

export const update = (id: number, jobId: string, jobStatus: JobStatus, status: StatusTypes, statusMessage: string) => {
  return prisma.services.update({
    where: { id: id },
    data: {
        jobId: jobId,
        jobStatus: jobStatus,
        status: status,
        statusMessage: statusMessage
    }
  });
};

export const getById = (id: number) => {
  return prisma.contacts.findUnique({
    where: { id: id },
  });
};

export const deleteById = (id: number) => {
  return prisma.contacts.delete({
    where: { id: id },
  });
};

