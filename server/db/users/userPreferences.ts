import { prisma } from "../prismaConnection";

export const getById = (id: number) => {
  return prisma.users.findUnique({
    where: { id: id },
  });
};

export const getByUserId = async (userId: number) => {
  return prisma.userPreferences.findMany({
    where: { userId: userId },
  });
};
