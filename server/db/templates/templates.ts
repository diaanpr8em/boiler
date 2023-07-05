import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.templates.findUnique({
        where: { id: id}
    })
}

export const getByName = (name: string) => {
    return prisma.templates.findFirst({
        where: { name: name}
    })
};
