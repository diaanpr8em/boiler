import { z } from "zod"
import { UniqueLinkCreateRequest, UniqueLinkRequest } from "~/server/models/validation/system/uniqueLinks";
import { v4 as uuidv4 } from 'uuid';
import { UniqueLinksDAL } from "~/server/db/system/uniqueLinks";
import { LinkType } from "@prisma/client";
import { Link } from "~/.nuxt/components";

const config = useRuntimeConfig()
class UniqueLinks {

    async addUniqueLink(model: UniqueLinkRequest){
        // generate a unique link id guid
    
        const linkId = `${uuidv4()}${uuidv4()}`;

        var action = "";
        switch(model.linkType){
            case LinkType.RESET_PASSWORD:
                action = "reset";
                break;
            case LinkType.UNSUBSCRIBE:
                    action = "unsubscribe";
                    break;
            case LinkType.VALIDATE_ACCOUNT:
                action = "validate";
                break;
            default:
                throw new Error("Invalid link type");
        }
        const urlPath = `${config.BASE_URL}/${action}/${linkId}`;
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