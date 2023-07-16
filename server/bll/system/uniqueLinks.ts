import { z } from "zod"
import { UniqueLinkCreateSchema, UniqueLinkRequest } from "~/server/models/validation/system/uniqueLinks";
import { v4 as uuidv4 } from 'uuid';
import { UniqueLinksDAL } from "~/server/db/system/uniqueLinks";
import { BusinessBase } from "../businessbase";
import { LinkType } from "@prisma/client";

const config = useRuntimeConfig()

type UniqueLinkCreateRequest = z.TypeOf<typeof UniqueLinkCreateSchema>

class UniqueLinks extends BusinessBase<UniqueLinks>{

    async addUniqueLink(model: UniqueLinkRequest){
        // generate a unique link id guid
    
        const linkId = `${uuidv4()}${uuidv4()}`;
        const urlPath = `${config.BASE_URL}/reset/${linkId}`;
        let expiry = new Date();
        expiry.setHours(expiry.getHours() + 4);
    
        const createModel: UniqueLinkCreateRequest = {
            userId: model.userId,
            linkId,
            linkType: model.linkType,
            urlPath,
            expiry
        } 
        
        return await UniqueLinksDAL.createUniqueLink(createModel)
    }

    async getUniqueLinkById(id: number){
        return UniqueLinksDAL.getUniqueLinkById(id);
    }
    
    async getUniqueLinkByLinkIdAndType(linkId: string, linkType: LinkType){
        return UniqueLinksDAL.getUniqueLinkByLinkIdAndType(linkId, linkType);
    }
}

export const UniqueLinksBLL = new UniqueLinks();