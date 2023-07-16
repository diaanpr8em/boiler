import { BusinessBase } from "../businessBase";
import { JobStatus, MessageTypes, Prisma, ProviderType, ServiceTypes } from "@prisma/client";
import { Services as ServicesDAL } from "~/server/db/services/services"

class Services extends BusinessBase<Services>{
    async insert(request: any, tenantId: number, serviceType: ServiceTypes, messageType: MessageTypes, providerType?: ProviderType)
    {
        let newRecord: Prisma.ServicesCreateInput;
        newRecord = {
            jobStatus: JobStatus.NEW,
            serviceType: serviceType,
            messageType: messageType,
            providerType: providerType,
            request: JSON.stringify(request),
            response: "",
            providerRequest: "",
            providerResponse: "",
            userId: 1,
            status: JobStatus.NEW,
            tenants: {
                connect: { id: tenantId }
            }
        }

        return await new ServicesDAL().insert(newRecord);
    }
}

export const ServicesBLL = new Services();