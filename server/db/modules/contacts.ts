import { prisma } from "../prismaConnection";
import { z } from "zod";
import { contactSchema } from "~/server/models/modules/contacts";

type ContactsRequest = z.TypeOf<typeof contactSchema>;

export const insert = (contactSchema: ContactsRequest) => {
  return prisma.contacts.create({
    data: {
      email: contactSchema.email,
      fullName: contactSchema.fullName,
      handle: contactSchema.handle,
      mobile: contactSchema.mobile,
    },
  });
};
