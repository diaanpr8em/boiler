import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.notificationContent.findUnique({
        where: { id: id}
    })
}

export const getByNotificationID = (id: number) => {
    return prisma.notificationContent.findFirst({
        where: { notificationId: id}
    })
};
