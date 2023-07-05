import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.notificationRecipients.findUnique({
        where: { id: id}
    })
}

export const getByNotificationID = (id: number) => {
    return prisma.notificationRecipients.findMany({
        where: { notificationId: id}
    })
};
