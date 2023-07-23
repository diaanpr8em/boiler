import { JobStatus, MessageTypes, ProviderType, ServiceTypes, StatusTypes } from "@prisma/client";
import { prisma } from "../prismaConnection";
import { ServiceRequest } from "~/server/models/validation/services/services";

class Services {
    
  async insert(model: ServiceRequest){
      return prisma.services.create({
        data: model
      });
    }
  
  async update(id: number, jobId: string, jobStatus: JobStatus, status: StatusTypes, statusMessage: string){
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
  
  getById(id: number){
    return prisma.services.findUnique({
      where: { id: id },
    });
  };
  
  deleteById(id: number){
    return prisma.services.delete({
      where: { id: id },
    });
  };

  linkTenantId(serviceId: number, tenantId: number){
    return prisma.services.update({
      where: { id: serviceId },
      data: {
          tenantId: tenantId
      }
    });
  }
}  

export const ServicesDAL = new Services();
