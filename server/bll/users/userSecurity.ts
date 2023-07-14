import { BusinessBase } from "../businessbase";
import { UserSecurityDAL } from "~/server/db/users/userSecurity";

class UserSecurity extends BusinessBase<UserSecurity>{
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