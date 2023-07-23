import { ProductsDAL } from "~/server/db/products/products";

class Products {
    async getByName(name: string) {
        return ProductsDAL.getByName(name);
    }
}

export const ProductsBLL = new Products();