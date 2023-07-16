import { prisma } from '../../prismaConnection'
import { z } from 'zod'
import { BusinessBase } from '~/server/bll/businessbase';
import { ContactGroupsInsertRequest, ContactGroupsSearchRequest, ContactGroupsUpdateRequest } from '~/server/models/validation/modules/contactGroups';
import { sortByFix } from '~/server/utils/models';

class ContactGroups {

    insert(data: ContactGroupsInsertRequest){
        return prisma.contactGroups.create({ data });
    }
    update(data: ContactGroupsUpdateRequest){
        return prisma.contactGroups.update({
          where: { id: data.id },
          data,
        });
      };
      
    getById(id: number){
          return prisma.contactGroups.findUnique({
              where: { id: id}
          });
    };
      
    deleteById(id: number){
          return prisma.contactGroups.delete({
              where: { id: id}
          });
    };
    
    async search(data: ContactGroupsSearchRequest){
        const skip = (data.page - 1) * data.rows;
    
        const sortBy = {
            orderBy: sortByFix(data.sortBy),
        }
    
        const where = {
            where: {
                OR: [
                    {
                        name: { contains: data.searchTerm }
                    },
                    {
                        description: { contains: data.searchTerm }
                    }
                ]
            }
        }
    
        const [rows, count] = await Promise.all([
            prisma.contactGroups.findMany({
                ...(data.sortBy ? sortBy : {}),
                ...(data.searchTerm != '' ? where : {}),
                skip,
                take: data.rows
            }),
            prisma.contactGroups.count({
                ...(data.searchTerm != '' ? where : {})
            })
        ])
    
        return {
            records: rows,
            total: count
        }
    }
}

export const ContactGroupsDAL = new ContactGroups();

