import { ProductStockRequest } from "~/server/models/validation/products/productStock";
import { prisma } from "../prismaConnection";

class ProductStock {

    async insert(model: ProductStockRequest){
        return prisma.productStock.create({
            data: model
        })
    }
    
    async update(model: ProductStockRequest){
        return prisma.productStock.update({
            where: { id: model.id },
            data: model
        })
    }

    async getById(id: number){
        return prisma.productStock.findUnique({
            where: { id: id}
        })
    }
    
    async getByTenantId(tenantId: number){
        return prisma.productStock.findMany({
            where: { tenantId: tenantId}
        })
    };
    
    async getStockLevels(userId: number, productId: number){
        const tenantLink = await prisma.userTenantLinks.findFirst({
            where: { userId: userId}
        })
    
        return prisma.productStock.findMany({
            where: { productId: productId, tenantId: tenantLink?.tenantId}
        })
    }
}

export const ProductStockDAL = new ProductStock();