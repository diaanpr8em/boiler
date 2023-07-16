import { LinkType } from "@prisma/client"
import { prisma } from "../prismaConnection"
import { z } from "zod"
import { UniqueLinkCreateRequest } from "../../models/validation/system/uniqueLinks"



class UniqueLinks {
    async getUniqueLinkById(id: number){
        return prisma.uniqueLinks.findUnique({
            where: {
                id
            }
        })
    }
    
    async getUniqueLinkByLinkIdAndType(linkId: string, linkType: LinkType){
        return prisma.uniqueLinks.findFirst({
            where: {
                linkId,
                linkType
            }
        })
    }
    
    async createUniqueLink(body: UniqueLinkCreateRequest){
        return prisma.uniqueLinks.create({
            data: body
        })
    }
}

export const UniqueLinksDAL = new UniqueLinks();