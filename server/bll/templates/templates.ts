import { BusinessBase } from "../businessBase"
import { Templates as TemplatesDAL } from "../../db/templates/templates"

class Templates extends BusinessBase<Templates>{
    async getById(id: number){
        return await new TemplatesDAL().getById(id);
    }
}

export const TemplatesBLL = new Templates();