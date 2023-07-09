import { Prisma } from "@prisma/client";
import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
    return prisma.notifications.findUnique({
        where: { id: id}
    })
}

export const insert = async (data: Prisma.NotificationsCreateInput) => {
	return prisma.notifications.create({
		data
	})
}