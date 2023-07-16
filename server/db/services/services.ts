import { JobStatus, MessageTypes, Prisma, ProviderType, ServiceTypes, StatusTypes } from "@prisma/client";
import { prisma } from "../prismaConnection";

class Services {
    
  async insertAsModel(model: Prisma.ServicesCreateInput){
      return prisma.services.create({
        data: model
      });
    }

  async insert(request: any, tenantId: number, serviceType: ServiceTypes, messageType: MessageTypes, providerType?: ProviderType){
    // queue the job
    // insert the data
    
  };
  
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
  
  async getById(id: number){
    return prisma.services.findUnique({
      where: { id: id },
    });
  };
  
  deleteById(id: number){
    return prisma.services.delete({
      where: { id: id },
    });
  };

}  

export const ServicesDAL = new Services();
