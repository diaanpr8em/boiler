import { prisma } from "../prismaConnection";

export class SystemSettings {
  
  async getByTenantId(id: number){
    return prisma.systemSettings.findMany({
      where: { tenantId: id },
    });
  };

}