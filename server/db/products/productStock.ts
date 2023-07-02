import { ProductStock } from "@prisma/client";
import { prisma } from "../prismaConnection";

export const update = async(model: ProductStock) => {
    return prisma.productStock.update({
        where: { id: model.id },
        data: model
    })
}
export const getById = async (id: number) => {
    return prisma.productStock.findUnique({
        where: { id: id}
    })
}

export const getByTenantId = async (tenantId: number) => {
    return prisma.productStock.findMany({
        where: { tenantId: tenantId}
    })
};

export const getStockLevels = async (userId: number, productId: number) => {
    const tenantLink = await prisma.userTenantLinks.findFirst({
        where: { userId: userId}
    })

    return prisma.productStock.findMany({
        where: { productId: productId, tenantId: tenantLink?.tenantId}
    })
}
