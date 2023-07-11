import { prisma } from "../prismaConnection";

export const getByTenantId = async (id: number) => {
  return prisma.systemSettings.findMany({
    where: { tenantId: id },
  });
};