import { UsersDAL } from "~/server/db/users/users";
import { BusinessBase } from "../businessBase";
import { BackendRegisterRequest, UserRegisterRequest, UserSearchRequest } from "~/server/models/validation/users";
import { Users as pUsers } from "@prisma/client";
import { prisma } from "~/server/db/prismaConnection";

class Users extends BusinessBase<pUsers>{

    constructor() {
        super(prisma.users);
    }

    async backendRegisterUser(parsedBody: BackendRegisterRequest){
        return UsersDAL.backendRegisterUser(parsedBody);
    }

    async deleteById(id: number){
        // return this.delete(id); // new way that we need to test
        return UsersDAL.deleteById(id);
    }

    async getUserById(id: number){
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