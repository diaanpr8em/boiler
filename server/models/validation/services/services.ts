import { JobStatus, MessageTypes, ProviderType, ServiceTypes, StatusTypes } from '@prisma/client';
import { z } from 'zod'

const serviceSchema = z.object({
    tenantId: z.number(),
    userId: z.number(),
    serviceType: z.nativeEnum(ServiceTypes),
    messageType: z.nativeEnum(MessageTypes),
    providerType: z.nativeEnum(ProviderType),
    providerRequest: z.string().min(0).max(10240),
    providerResponse: z.string().min(0).max(10240),
    status: z.nativeEnum(StatusTypes),
    statusMessage: z.string().min(0).max(255),
    retryCount: z.number(),
    jobId: z.string().min(0).max(255),
    jobStatus: z.nativeEnum(JobStatus),
    request: z.string().min(0).max(10240),
    response: z.string().min(0).max(10240)
})

export type ServiceRequest = z.TypeOf<typeof serviceSchema>;