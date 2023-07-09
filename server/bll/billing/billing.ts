import { getById as getUserById } from "~/server/db/users/users"
import { getById as getProductById } from "~/server/db/products/products";
import { update, getStockLevels } from "~/server/db/products/productStock";
import { boolean } from "zod";
import { BusinessError, Codes } from "~/server/models/exceptions/BusinessError";

export const processProductTransaction = async (tenantId: number, productId: number, volume: number) => {
    var sufficient = hasSufficientBalanceAvailable(tenantId, productId, volume);

    if (!sufficient) {
        throw new BusinessError(Codes.E200);
    }
}

const hasSufficientBalanceAvailable = async (tenantId: number, productId: number, volume: number) => {
    var sufficient = false;
    // get the stock levels of all products matching
    // so that it still makes sense even if they have multiple bundles
    const stock = await getStockLevels(tenantId, productId)
    const sumOfAvailableVolumes = stock.reduce((total, item) => total + item.volume, 0);
    if (sumOfAvailableVolumes > volume) return true;

    return sufficient;
}

const reduceBalance = async (userId: number, productId: number, volume: number) => {
    // get the stock levels of all products matching
    // so that it still makes sense even if they have multiple bundles
    const stock = await getStockLevels(userId, productId)

    var filled = false;
    for(const item of stock){
        if (filled) break;

        // do some stuff to subtract across multiple stock items if we have to
        // in order to fulfill the current request
        if (item.volume - volume < 0){
            volume = volume - item.volume;
            item.volume = 0;

            update(item);
            // move to the next item
            continue;
        }

        item.volume = item.volume - volume;
        filled = true;
        update(item);
    }
}