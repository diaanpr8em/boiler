import { BusinessBase } from "~/server/bll/businessbase"
import { prisma } from "../prismaConnection"

export class UserSecurity extends BusinessBase<UserSecurity>{

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
