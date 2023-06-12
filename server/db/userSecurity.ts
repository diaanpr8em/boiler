import { prisma } from "./prismaConnection"

export const updateRefreshToken =  (userId: number, refreshToken: string) => {
	return prisma.userSecurity.update({
		where: {
			userId
		},
		data: {
			refreshToken
		}
	})
}