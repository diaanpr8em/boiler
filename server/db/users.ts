import { prisma } from "./prismaConnection"
import { hashSync } from 'bcrypt'
import { z } from "zod"

import { userRegister } from "../models/users"
import { getTenantByDomain } from "./tenants"
import { BusinessError, Codes } from "../models/exceptions/BusinessError"

type UserRegisterRequest = z.TypeOf<typeof userRegister>;

export const getById = (id: number) => {
	return prisma.users.findUnique({
		where: {
			id
		}
	})
}

export const getUserAuthDataById = async (id: number) => {
	return prisma.users.findUnique({
		where: {
			id
		},
		include: {
			UserTenantLinks: {
				include: {
					tenants: true
				}
			},
			UserRole: true
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

export const registerUser = async (parsedBody: UserRegisterRequest, domain: string) => {

	const tenant = await getTenantByDomain(domain) 
	if (!tenant) throw new BusinessError(Codes.E111) 

	return prisma.users.create({
		data: {
			email: parsedBody.email,
			name: parsedBody.name,
			surname: parsedBody.surname,

			UserSecurity: {
				create: {
					password: await hashSync(parsedBody.password, 10)
				}
			},

			UserRole: {
				create: {
					role: 'USER'
				}
			},

			UserTenantLinks: {
				create: {
					tenants: {
						connect: {
							id: tenant.id
						}
					}
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