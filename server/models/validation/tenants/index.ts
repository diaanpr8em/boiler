import { Tenants } from '@prisma/client'
import { z } from 'zod'

export type TenantInsertRequest = z.TypeOf<typeof tenantInsertSchema>
export const tenantInsertSchema = z.object({
    name: z.string().min(2).max(100),
    domain: z.string().min(2).max(100),
    currency: z.enum(['AUD','EUR','GBP','USD','ZAR']).default('ZAR')
})

export type TenantSearchRequest = z.TypeOf<typeof tenantSearchSchema>
export const tenantSearchSchema = z.object({
    searchTerm: z.string().max(150).optional(),
    page: z.number().default(1),
    rows: z.number().default(10),
    sortBy: z.array(
        z.object({
            key: z.string().max(150),
            order: z.string().max(4),
        })
    ).optional(),
})

export type TenantUpdateRequest = z.TypeOf<typeof tenantUpdateSchema>
export const tenantUpdateSchema = z.object({
    id: z.number(),
    name: z.string().min(2).max(100),
    domain: z.string().min(2).max(100),
})

export class TenantsSearchResponse {
    page: number = 0
    rows: number = 10
    total: number = 0
    records: Tenants[] = []

    constructor(data?: TenantsSearchResponse) {
        if (data) {
            Object.assign(this, data)
            return
        }
    }
}