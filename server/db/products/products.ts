import { prisma } from "../prismaConnection";

export class Products {

    async getById(id: number){
        return prisma.products.findUnique({
            where: { id: id}
        })
    }
    
    async getByName(name: string){
        return prisma.products.findFirst({
            where: { name: name}
        })
    };
}
