import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.notifications.findUnique({
        where: { id: id}
    })
}