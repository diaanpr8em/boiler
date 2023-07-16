import { BusinessBase } from "../../businessbase";
import { ContactsDAL } from "~/server/db/modules/contacts/contacts";
import { ContactsSearchRequest, ContactsInsertRequest, ContactsUpdateRequest } from "~/server/models/validation/modules/contacts";

class Contacts extends BusinessBase<Contacts>
{
    async deleteById(id: number){
        return ContactsDAL.deleteById(id);
    }

    async getById(id: number){
        return ContactsDAL.getById(id);
    }

    async insert(model: ContactsInsertRequest)
    {
        return ContactsDAL.insert(model);
    }

    async search(model: ContactsSearchRequest){
        return ContactsDAL.search(model);
    }
    
    async update(model: ContactsUpdateRequest){
        return ContactsDAL.update(model);
    }

}

export const ContactsBLL = new Contacts();