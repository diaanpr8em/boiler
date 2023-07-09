import { LinkType } from "@prisma/client"
import { prisma } from "./prismaConnection"
import { z } from "zod"
import { UniqueLinkCreateSchema } from "../models/validation/system/uniqueLinks"

type UniqueLinkCreateRequest = z.TypeOf<typeof UniqueLinkCreateSchema>

export const getUniqueLinkById = (id: number) => {
    return prisma.uniqueLinks.findUnique({
        where: {
            id
        }
    })
}

export const getUniqueLinkByLinkIdAndType = (linkId: string, linkType: LinkType) => {
    return prisma.uniqueLinks.findFirst({
        where: {
            linkId,
            linkType
        }
    })
}

export const createUniqueLink = (body: UniqueLinkCreateRequest) => {
    return prisma.uniqueLinks.create({
        data: body
    })
}