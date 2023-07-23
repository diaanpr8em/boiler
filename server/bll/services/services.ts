import { JobStatus, MessageTypes, ProviderType, ServiceTypes } from "@prisma/client";
import { ServicesDAL } from "~/server/db/services/services"
import { ServiceRequest } from "~/server/models/validation/services/services";

class Services {
    async insert(model: ServiceRequest)
    {
        const service = await ServicesDAL.insert(model);
        // now link the tenant
        await ServicesDAL.linkTenantId(service.id, model.tenantId);

        return service;
    }
}

export const ServicesBLL = new Services();