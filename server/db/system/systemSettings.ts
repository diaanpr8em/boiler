import { prisma } from "../prismaConnection";

class SystemSettings {
  
  async getByTenantId(tenantId: number){
    return prisma.systemSettings.findMany({
      where: { tenantId: tenantId },
    });
  };

}

export const SystemSettingsDAL = new SystemSettings();