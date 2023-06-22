import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.products.findUnique({
        where: { id: id}
    })
}

export const getByName = (name: string) => {
    return prisma.products.findFirst({
        where: { name: name}
    })
};
