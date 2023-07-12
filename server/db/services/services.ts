import { JobStatus, MessageTypes, Prisma, ProviderType, ServiceTypes, StatusTypes } from "@prisma/client";
import { prisma } from "../prismaConnection";

export class Services {
  async insert(model: Prisma.ServicesCreateInput){
    return prisma.services.create({
      data: model
    });
  }
}
export const insert = async(request: any, tenantId: number, serviceType: ServiceTypes, messageType: MessageTypes, providerType?: ProviderType) => {
  // queue the job
  // insert the data
  
};

export const update = async (id: number, jobId: string, jobStatus: JobStatus, status: StatusTypes, statusMessage: string) => {
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

