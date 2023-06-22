import { JobStatus, ServiceTypes, StatusTypes } from "@prisma/client";
import { prisma } from "./prismaConnection";

export const insert = (model: any, serviceType: ServiceTypes) => {
  // queue the job
  // insert the data
  var record = prisma.services.create({
    data: {
      jobStatus: JobStatus.NEW,
      type: serviceType,
      request: JSON.stringify(model),
      response: "",
      providerRequest: "",
      providerResponse: "",
      userId: 1,
      status: JobStatus.NEW,
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
  return prisma.services.findUnique({
    where: { id: id },
  });
};

export const deleteById = (id: number) => {
  return prisma.services.delete({
    where: { id: id },
  });
};

