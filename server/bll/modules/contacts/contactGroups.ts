import { BusinessBase } from "../../businessBase";
import { ContactGroupsInsertRequest, ContactGroupsSearchRequest, ContactGroupsUpdateRequest } from '~/server/models/validation/modules/contactGroups';
import { ContactGroupsDAL } from "~/server/db/modules/contacts/contactGroups"

class ContactGroups extends BusinessBase<ContactGroups>{
    insert(data: ContactGroupsInsertRequest){
        return ContactGroupsDAL.insert(data);
    }
    update(data: ContactGroupsUpdateRequest){
        return ContactGroupsDAL.update(data);
      };
      
    getById(id: number){
          return ContactGroupsDAL.getById(id);
    };
      
    deleteById(id: number){
        return ContactGroupsDAL.deleteById(id);
    };
    
    search(data: ContactGroupsSearchRequest){
        return ContactGroupsDAL.search(data);
    }

}

export const ContactGroupsBLL = new ContactGroups();