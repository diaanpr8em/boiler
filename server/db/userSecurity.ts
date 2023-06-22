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

export const getRefreshToken = (refreshToken: string) => {
	return prisma.userSecurity.findUnique({
		where: {
			refreshToken
		}
	})
}

export const removeRefreshToken = (refreshToken: string) => {
	return prisma.userSecurity.update({
		where: {
			refreshToken
		},
		data: {
			refreshToken: null
		}
	})
}