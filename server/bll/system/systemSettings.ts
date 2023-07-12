import { BusinessBase } from '../businessbase';
import { SystemSettings as SystemSettingsDAL } from "~/server/db/system/systemSettings";

export class SystemSettings extends BusinessBase<SystemSettings>{
    async getByTenantId(tenantId: number){
        return await new SystemSettingsDAL().getByTenantId(tenantId);
    }
}
