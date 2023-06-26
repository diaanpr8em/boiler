import { prisma } from "../prismaConnection";
import { z } from "zod";
import {
  contactInsertSchema,
  contactSearchSchema,
  contactUpdateSchema,
} from "~/server/models/validation/modules/contacts";
import { sortByFix } from "~/server/utils/models";

type ContactsInsertRequest = z.TypeOf<typeof contactInsertSchema>;
type ContactsUpdateRequest = z.TypeOf<typeof contactUpdateSchema>;
type ContactsSearchRequest = z.TypeOf<typeof contactSearchSchema>;

export const insert = (data: ContactsInsertRequest) => prisma.contacts.create({ data });

export const update = (data: ContactsUpdateRequest) => {
  return prisma.contacts.update({
    where: { id: data.id },
    data: data,
  });
};

export const getById = (id: number) => {
    return prisma.contacts.findUnique({
        where: { id: id}
    });
};

export const deleteById = (id: number) => {
    return prisma.contacts.delete({
        where: { id: id}
    });
};

export const search = async (data: ContactsSearchRequest) => {
  const skip = (data.page - 1) * data.rows;

  const sortBy = {
    orderBy: sortByFix(data.sortBy),
  }

  const where = {
    where: {
      OR: [
        {
          email: { contains: data.searchTerm }
        },
        {
          fullName: { contains: data.searchTerm }
        },
        {
          mobile: { contains: data.searchTerm }
        }
      ]
    }
  }

  const total = await prisma.contacts.count({
    ...(data.searchTerm != '' ? where : {})
  })

  const records = await prisma.contacts.findMany({
    skip,
    take: data.rows,
    ...(data.searchTerm != '' ? where : {}),
    ...(data.sortBy ? sortBy : {})
  });

  return {
    records,
    total
  }
};
