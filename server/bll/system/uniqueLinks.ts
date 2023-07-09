import { z } from "zod"
import { UniqueLinkCreateSchema, UniqueLinkRequest } from "~/server/models/validation/system/uniqueLinks";
import { v4 as uuidv4 } from 'uuid';
import { createUniqueLink } from "~/server/db/uniqueLinks";

const config = useRuntimeConfig()

type UniqueLinkCreateRequest = z.TypeOf<typeof UniqueLinkCreateSchema>

export const addUniqueLink = async (model: UniqueLinkRequest) => {
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
    
    return await createUniqueLink(createModel)
}