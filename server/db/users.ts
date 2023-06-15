import { prisma } from "./prismaConnection"
import { hashSync } from 'bcrypt'
import { z } from "zod"

import { userRegister } from "../models/users"

type UserRegisterRequest = z.TypeOf<typeof userRegister>;

export const userExists = (email: string) => {
	return prisma.users.findUnique({
		where: {
			email
		},
		include: {
			UserSecurity: true
		}
	})
}

export const registerUser = async (parsedBody: UserRegisterRequest) => {
	return prisma.users.create({
		data: {
			email: parsedBody.email,
			name: parsedBody.name,
			surname: parsedBody.surname,

			UserSecurity: {
				create: {
					password: await hashSync(parsedBody.password, 10)
				}
			}
		}
	})
}