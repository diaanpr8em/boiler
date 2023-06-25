import { prisma } from "./prismaConnection"
import { hashSync } from 'bcrypt'
import { z } from "zod"

import { userRegister } from "../models/users"

type UserRegisterRequest = z.TypeOf<typeof userRegister>;

export const getById = (id: number) => {
	return prisma.users.findUnique({
		where: {
			id
		}
	})
}

export const getUserTenantById = async (id: number) => {
	return prisma.users.findUnique({
		where: {
			id
		},
		include: {
			Tenants: true
		}
	})
}

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

export const resetPassword = async (email: string, password: string) => {
	return prisma.users.update({
		where: {
			email
		},
		data: {
			UserSecurity: {
				update: {
					password: await hashSync(password, 10)
				}
			}
		}
	})
}