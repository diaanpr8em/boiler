import { z } from "zod"
import { LinkType } from "@prisma/client"

export const UniqueLinkCreateSchema = z.object({
    userId: z.number(),
    linkId: z.string(),
    linkType: z.enum([LinkType.RESET_PASSWORD]),
    urlPath: z.string(),
    expiry: z.date()
})

export class UniqueLinkRequest {
    userId: number = 0
    linkType = LinkType.RESET_PASSWORD

    constructor(data?: UniqueLinkRequest) {
        if (data) {
            Object.assign(this, data)
            return
        }
    }
}

export type UniqueLinkCreateRequest = z.TypeOf<typeof UniqueLinkCreateSchema>