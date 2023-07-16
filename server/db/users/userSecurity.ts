import { prisma } from "../prismaConnection"

class UserSecurity {

	updateRefreshToken(userId: number, refreshToken: string){
		return prisma.userSecurity.update({
			where: {
				userId
			},
			data: {
				refreshToken
			}
		})
	}
	
	getRefreshToken(refreshToken: string){
		return prisma.userSecurity.findUnique({
			where: {
				refreshToken
			}
		})
	}
	
	removeRefreshToken(refreshToken: string){
		return prisma.userSecurity.update({
			where: {
				refreshToken
			},
			data: {
				refreshToken: null
			}
		})
	}
}

export const UserSecurityDAL = new UserSecurity();
