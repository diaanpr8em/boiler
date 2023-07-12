import { prisma } from "../prismaConnection";

export class SystemSettings {
  
  async getByTenantId(tenantId: number){
    return prisma.systemSettings.findMany({
      where: { tenantId: tenantId },
    });
  };

}