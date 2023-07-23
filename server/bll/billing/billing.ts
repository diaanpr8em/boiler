import { ProductStockBLL } from "~/server/bll/products/productStock";
import { boolean } from "zod";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";

class Billing {
    
    async processProductTransaction(tenantId: number, productId: number, volume: number){
        var sufficient = this.hasSufficientBalanceAvailable(tenantId, productId, volume);
    
        if (!sufficient) {
            throw new BusinessError(Codes.E200);
        }

        this.reduceBalance(tenantId, productId, volume);
    }
    
    async hasSufficientBalanceAvailable(tenantId: number, productId: number, volume: number){
        var sufficient = false;
        // get the stock levels of all products matching
        // so that it still makes sense even if they have multiple bundles
        const stock = await ProductStockBLL.getStockLevels(tenantId, productId)
        const sumOfAvailableVolumes = stock.reduce((total, item) => total + item.volume, 0);
        if (sumOfAvailableVolumes > volume) return true;
    
        return sufficient;
    }

    async reduceBalance(tenantId: number, productId: number, volume: number){
        // get the stock levels of all products matching
        // so that it still makes sense even if they have multiple bundles
        const stock = await ProductStockBLL.getStockLevels(tenantId, productId)
    
        var filled = false;
        for(const item of stock){
            if (filled) break;
    
            // do some stuff to subtract across multiple stock items if we have to
            // in order to fulfill the current request
            if (item.volume - volume < 0){
                volume = volume - item.volume;
                item.volume = 0;
    
                await ProductStockBLL.update(item);
                // move to the next item
                continue;
            }
    
            item.volume = item.volume - volume;
            filled = true;
            await ProductStockBLL.update(item);
        }
    }
}

export const BillingBLL = new Billing();

