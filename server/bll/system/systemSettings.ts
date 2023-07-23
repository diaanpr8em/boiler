import { BusinessBase } from '../businessBase';
import { SystemSettingsDAL } from "~/server/db/system/systemSettings";

class SystemSettings {
    async getByTenantId(tenantId: number){
        return await SystemSettingsDAL.getByTenantId(tenantId);
    }
}

export const SystemSettingsBLL = new SystemSettings();
