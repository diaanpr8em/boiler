import { prisma } from "../prismaConnection";

class UserPreferences {
  getById(id: number) {
    return prisma.users.findUnique({
      where: { id: id }
    });
  }

  async getByUserId(userId: number) {
    return prisma.userPreferences.findMany({
      where: { userId: userId }
    });
  }
}

export const UserPreferencesDAL = new UserPreferences();
