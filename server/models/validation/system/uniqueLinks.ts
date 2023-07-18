import { z } from "zod"
import { LinkType } from "@prisma/client"

export const UniqueLinkCreateSchema = z.object({
    userId: z.number(),
    linkId: z.string(),
    linkType: z.nativeEnum(LinkType),
    urlPath: z.string(),
    expiry: z.date()
})

export class UniqueLinkRequest {
    userId: number = 0
    linkType: LinkType = LinkType.RESET_PASSWORD

    constructor(data?: UniqueLinkRequest) {
        if (data) {
            Object.assign(this, data)
            return
        }
    }
}

export type UniqueLinkCreateRequest = z.TypeOf<typeof UniqueLinkCreateSchema>