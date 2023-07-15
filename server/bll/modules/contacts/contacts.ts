import { Prisma } from "@prisma/client";
import { BusinessBase } from "../../businessbase";
import { ContactsDAL } from "~/server/db/modules/contacts/contacts";
import { ContactsSearchRequest } from "~/server/models/validation/modules/contacts";

class Contacts extends BusinessBase<Contacts>
{
    async deleteById(id: number){
        return ContactsDAL.deleteById(id);
    }

    async insert(model: Prisma.ContactsUncheckedCreateInput)
    {
        return ContactsDAL.insert(model);
    }

    async search(model: ContactsSearchRequest){
        return ContactsDAL.search(model);
    }
    
    async update(model: Prisma.ContactsUncheckedUpdateInput){
        return ContactsDAL.update(model);
    }

}

export const ContactsBLL = new Contacts();