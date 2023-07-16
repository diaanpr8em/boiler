import { UsersDAL } from "~/server/db/users/users";
import { BusinessBase } from "../businessbase";
import { z } from "zod";
import { UserSearchRequest, backendRegister, userRegister } from "~/server/models/validation/users";

type UserRegisterRequest = z.TypeOf<typeof userRegister>;
type BackendRegisterRequest = z.TypeOf<typeof backendRegister>;

class Users extends BusinessBase<Users>{

    async backendRegisterUser(parsedBody: BackendRegisterRequest){
        return UsersDAL.backendRegisterUser(parsedBody);
    }

    async deleteById(id: number){
        return UsersDAL.deleteById(id);
    }

    async getById(id: number){
        return UsersDAL.getById(id);
    }

    async getUserAuthDataById(id: number){
        return UsersDAL.getUserAuthDataById(id);
    }

    async registerUser(parsedBody: UserRegisterRequest, domain: string){
        return UsersDAL.registerUser(parsedBody, domain);
    }

    async resetPassword(email: string, password: string){
        return UsersDAL.resetPassword(email, password);
    }

    async search(data: UserSearchRequest){
        return UsersDAL.search(data);
    }

    async userExists(email: string){
        return UsersDAL.userExists(email);
    }
}

export const UsersBLL = new Users();