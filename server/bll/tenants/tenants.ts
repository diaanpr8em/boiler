import { BusinessBase } from "../businessbase";
import { Tenants as TenantsDAL } from "~/server/db/tenants/tenants"

export class Tenants extends BusinessBase<Tenants>{
    async getByUserId(userId: number){
        return new TenantsDAL().getByUserId(userId);
    }
}