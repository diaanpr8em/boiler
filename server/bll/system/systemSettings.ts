import { BusinessBase } from '../businessBase';
import { SystemSettings as SystemSettingsDAL } from "~/server/db/system/systemSettings";

class SystemSettings extends BusinessBase<SystemSettings>{
    async getByTenantId(tenantId: number){
        return await new SystemSettingsDAL().getByTenantId(tenantId);
    }
}

export const SystemSettingsBLL = new SystemSettings();
