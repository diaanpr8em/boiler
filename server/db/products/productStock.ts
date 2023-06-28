import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.productStock.findUnique({
        where: { id: id}
    })
}

export const getByTenantId = (tenantId: number) => {
    return prisma.productStock.findUnique({
        where: { tenantId: tenantId}
    })
};

export const getStockLevels = async (userId: number, productId: number) => {
    const tenant = await prisma.tenants.findFirst({
        where: { userId: userId}
    })

    return prisma.productStock.findMany({
        where: { userId: userId, productId: productId, tenantId: tenant?.id}
    })
}
