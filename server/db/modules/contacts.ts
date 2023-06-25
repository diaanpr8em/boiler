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

export const insert = (contactSchema: ContactsInsertRequest) => {
  return prisma.contacts.create({
    data: contactSchema
  });
};

export const update = (contactSchema: ContactsUpdateRequest) => {
  return prisma.contacts.update({
    where: { id: contactSchema.id },
    data: contactSchema,
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

export const search = async (contactSearchSchema: ContactsSearchRequest) => {
  const skip = (contactSearchSchema.page - 1) * contactSearchSchema.rows;

  const sortBy = {
    orderBy: sortByFix(contactSearchSchema.sortBy),
  }

  const where = {
    where: {
      OR: [
        {
          email: { contains: contactSearchSchema.searchTerm }
        },
        {
          fullName: { contains: contactSearchSchema.searchTerm }
        },
        {
          mobile: { contains: contactSearchSchema.searchTerm }
        }
      ]
    }
  }

  const total = await prisma.contacts.count({
    ...(contactSearchSchema.searchTerm != '' ? where : {})
  })

  const records = await prisma.contacts.findMany({
    skip,
    take: contactSearchSchema.rows,
    ...(contactSearchSchema.searchTerm != '' ? where : {}),
    ...(contactSearchSchema.sortBy ? sortBy : {})
  });

  return {
    records,
    total
  }
};
