import { ProductStockRequest } from "~/server/models/validation/products/productStock";
import { BusinessBase } from "../businessBase";
import { ProductStockDAL } from "~/server/db/products/productStock";

class ProductStock {
    async getStockLevels(tenantId: number, productId: number){
        return await ProductStockDAL.getStockLevels(tenantId, productId);
    }

    async update(model: ProductStockRequest){
        return await ProductStockDAL.update(model);
    }
}

export const ProductStockBLL = new ProductStock();
