import { BusinessBase } from "../businessbase";
import { ProductStock as ProductStockDAL } from "~/server/db/products/productStock";
import { ProductStock as ProductStockModel } from "@prisma/client"

export class ProductStock extends BusinessBase<ProductStock>{
    async getStockLevels(tenantId: number, productId: number){
        return await new ProductStockDAL().getStockLevels(tenantId, productId);
    }

    async update(model: ProductStockModel){
        return await new ProductStockDAL().update(model);
    }
}