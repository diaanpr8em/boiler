import { prisma } from "../prismaConnection";

export const getById = async (id: number) => {
    return prisma.notificationRecipients.findUnique({
        where: { id: id}
    })
}

export const getByNotificationId = async (id: number) => {
    return prisma.notificationRecipients.findMany({
        where: { notificationId: id}
    })
};
