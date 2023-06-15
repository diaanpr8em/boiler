import { prisma } from "../prismaConnection";
import { z } from "zod";
import {
  contactInsertSchema,
  contactSearchSchema,
  contactUpdateSchema,
} from "~/server/models/modules/contacts";

type ContactsInsertRequest = z.TypeOf<typeof contactInsertSchema>;
type ContactsUpdateRequest = z.TypeOf<typeof contactUpdateSchema>;
type ContactsSearchRequest = z.TypeOf<typeof contactSearchSchema>;

export const insert = (contactSchema: ContactsInsertRequest) => {
  return prisma.contacts.create({
    data: contactSchema
    // data: {
    //   email: contactSchema.email,
    //   fullName: contactSchema.fullName,
    //   handle: contactSchema.handle,
    //   mobile: contactSchema.mobile,
    // },
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

export const search = (contactSearchSchema: ContactsSearchRequest) => {
  return prisma.contacts.findMany({
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
  });
};
