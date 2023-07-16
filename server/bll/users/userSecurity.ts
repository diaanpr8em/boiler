import { BusinessBase } from "../businessBase";
import { UserSecurityDAL } from "~/server/db/users/userSecurity";
import { UserSecurity as pUserSecurity } from "@prisma/client";
import { prisma } from "~/server/db/prismaConnection";

class UserSecurity extends BusinessBase<pUserSecurity>{

	constructor(){
		super(prisma.userSecurity);
	}

    updateRefreshToken(userId: number, refreshToken: string){
        return UserSecurityDAL.updateRefreshToken(userId, refreshToken);
	}
	
	getRefreshToken(refreshToken: string){
        return UserSecurityDAL.getRefreshToken(refreshToken);
	}
	
	removeRefreshToken(refreshToken: string){
        return UserSecurityDAL.removeRefreshToken(refreshToken);
	}
}

export const UserSecurityBLL = new UserSecurity();