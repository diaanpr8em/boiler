import { BusinessBase } from "../businessBase"
import { TemplatesDAL } from "../../db/templates/templates"

class Templates {
    async getById(id: number){
        return await TemplatesDAL.getById(id);
    }
}

export const TemplatesBLL = new Templates();