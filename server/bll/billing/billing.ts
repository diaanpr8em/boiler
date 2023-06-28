import { getById as getUserById } from "~/server/db/users"
import { getById as getProductById } from "~/server/db/products/products";
import { getStockLevels } from "~/server/db/products/productStock";

export const hasSufficientBalanceAvailable = async (userId: number, productId: number, volume: number) => {
    var sufficient = false;

    // get the product 
    const product = getProductById(productId);

    // get the user 
    const user = getUserById(userId)

    // get the stock levels
    const stock = getStockLevels(userId, productId)
    if (stock.)
    return sufficient;
}

export const reduceBalance = async (userId: number, productId: number, volume: number) => {
    
}