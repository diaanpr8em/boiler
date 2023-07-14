import { prisma } from '../../prismaConnection'
import { z } from 'zod'
import { 
    contactGroupInsertSchema, 
    contactGroupSearchSchema, 
    contactGroupUpdateSchema 
} from '~/server/models/validation/modules/contactGroups';
import { sortByFix } from '~/server/utils/models';


type ContactGroupsInsertRequest = z.TypeOf<typeof contactGroupInsertSchema>;
type ContactGroupsUpdateRequest = z.TypeOf<typeof contactGroupUpdateSchema>;
type ContactGroupsSearchRequest = z.TypeOf<typeof contactGroupSearchSchema>;

export const insert = (data: ContactGroupsInsertRequest) => prisma.contactGroups.create({ data });

export const update = (data: ContactGroupsUpdateRequest) => {
    return prisma.contactGroups.update({
      where: { id: data.id },
      data,
    });
  };
  
  export const getById = (id: number) => {
      return prisma.contactGroups.findUnique({
          where: { id: id}
      });
  };
  
  export const deleteById = (id: number) => {
      return prisma.contactGroups.delete({
          where: { id: id}
      });
  };

export const search = async (data: ContactGroupsSearchRequest) => {
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