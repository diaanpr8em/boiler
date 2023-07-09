import { z } from 'zod'

export type TenantInsertRequest = z.TypeOf<typeof tenantInsertSchema>
export const tenantInsertSchema = z.object({
    name: z.string().min(2).max(100),
    domain: z.string().min(2).max(100),
    currency: z.enum(['AUD','EUR','GBP','USD','ZAR']).default('ZAR')
})