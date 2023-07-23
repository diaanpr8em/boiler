import { TenantInsertRequest, TenantSearchRequest, TenantUpdateRequest } from "~/server/models/validation/tenants";
import { TenantsDAL } from "~/server/db/tenants/tenants"

class Tenants {

    async getAll(){
        return TenantsDAL.getAll();
    }

    async getByDomain(domain: string){
        return TenantsDAL.getByDomain(domain);
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