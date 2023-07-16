import { Prisma } from "@prisma/client";
import { prisma } from "../../prismaConnection";
import { z } from "zod";
import {
  ContactsInsertRequest,
  ContactsSearchRequest,
  ContactsUpdateRequest,
} from "~/server/models/validation/modules/contacts";
import { sortByFix } from "~/server/utils/models";

class Contacts {

  async insert(model: ContactsInsertRequest){
    return prisma.contacts.create({ 
      data: {
        email: model.email,
        fullName: model.fullName,
        mobile: model.mobile,
        tenant: {
          connect: {
            id: model.tenantId
          }
        },
        handle: model.handle,
      }
    });
  }
  
  async update(model: ContactsUpdateRequest){
    return prisma.contacts.update({
      where: { id: model.id as unknown as number },
      data: model,
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

