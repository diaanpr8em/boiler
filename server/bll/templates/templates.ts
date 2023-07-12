import { BusinessBase } from "../businessbase"
import { Templates as TemplatesDAL } from "../../db/templates/templates"

export class Templates extends BusinessBase<Templates>{
    async getById(id: number){
        return await new TemplatesDAL().getById(id);
    }
}