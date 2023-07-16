import { TenantInsertRequest, TenantSearchRequest, TenantUpdateRequest } from "~/server/models/validation/tenants";
import { BusinessBase } from "../businessBase";
import { TenantsDAL } from "~/server/db/tenants/tenants"

class Tenants extends BusinessBase<Tenants>{

    async deleteById(id: number){
        return TenantsDAL.deleteById(id);
    }

    async getAll(){
        return TenantsDAL.getAll();
    }

    async getByDomain(domain: string){
        return TenantsDAL.getByDomain(domain);
    }

    async getById(id: number){
        return TenantsDAL.getById(id);
    }

    async getByUserId(userId: number){
        return TenantsDAL.getByUserId(userId);
    }

    async insert(data: TenantInsertRequest){
        return TenantsDAL.insert(data);
    }

    async search(data: TenantSearchRequest){
        return TenantsDAL.search(data);
    }

    async update(data: TenantUpdateRequest){
        return TenantsDAL.update(data);
    }
}

export const TenantsBLL = new Tenants();