import { BusinessBase } from "../../businessBase";
import { ContactsDAL } from "~/server/db/modules/contacts/contacts";
import { ContactsInsertRequest, ContactsSearchRequest, ContactsUpdateRequest } from "~/server/models/validation/modules/contacts";
import { Contacts as pContacts } from "@prisma/client";
import { prisma } from "~/server/db/prismaConnection";

class Contacts extends BusinessBase<pContacts>
{
    constructor() {
        super(prisma.contacts);
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