import { z } from "zod";

const productStockSchema = z.object({
  id: z.number().optional(),
  productId: z.number(),
  orderId: z.number(),
  tenantId: z.number(),
  bundle: z.boolean(),
  bundleId: z.number().optional(),
  volume: z.number()
});

export { productStockSchema };

export type ProductStockRequest = z.TypeOf<typeof productStockSchema>;
