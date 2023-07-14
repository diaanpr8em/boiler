import { prisma } from "../../prismaConnection";
import { z } from "zod";
import { BusinessBase } from "~/server/bll/businessbase";
import {
  contactInsertSchema,
  contactSearchSchema,
  contactUpdateSchema,
} from "~/server/models/validation/modules/contacts";
import { sortByFix } from "~/server/utils/models";

type ContactsInsertRequest = z.TypeOf<typeof contactInsertSchema>;
type ContactsUpdateRequest = z.TypeOf<typeof contactUpdateSchema>;
type ContactsSearchRequest = z.TypeOf<typeof contactSearchSchema>;

class Contacts extends BusinessBase<Contacts>{

  async insert(data: ContactsInsertRequest){
    return prisma.contacts.create({ 
      data: {
        email: data.email,
        fullName: data.fullName,
        mobile: data.mobile,
        tenantId: data.tenantId as number,
        handle: data.handle,
      }
    });
  }
  
  async update(data: ContactsUpdateRequest){
    return prisma.contacts.update({
      where: { id: data.id },
      data: data,
    });
  };
  
  async getById(id: number){
      return prisma.contacts.findUnique({
          where: { id: id}
      });
  };
  
  async deleteById(id: number){
      return prisma.contacts.delete({
          where: { id: id}
      });
  };
  
  async search(data: ContactsSearchRequest){
    const { searchTerm, page, rows: take, sortBy } = data;
    const skip = (page - 1) * take;
  
    const orderBy = sortBy ? sortByFix(sortBy) : {}
  
    const where = searchTerm ? {
      OR: [
        { email: { contains: searchTerm } },
        { fullName: { contains: searchTerm } },
        { mobile: { contains: searchTerm } }
      ]
    } : {}
  
    const total = await prisma.contacts.count({ where })
  
    const records = await prisma.contacts.findMany({
      include: {
        tenant: true
      },
      skip,
      take,
      where,
      orderBy
    });
  
    return {
      records,
      total
    }
  };
}

export const ContactsDAL = new Contacts();

