import { prisma } from "../prismaConnection"
import { hashSync } from 'bcrypt'
import { z } from "zod"

import { UserSearchRequest, backendRegister, userRegister } from "../../models/validation/users"
import { getTenantByDomain } from "../tenants/tenants"
import { BusinessError, Codes } from "../../models/exceptions/BusinessError"

type UserRegisterRequest = z.TypeOf<typeof userRegister>;
type BackendRegisterRequest = z.TypeOf<typeof backendRegister>;

export const deleteById = (id: number) => {
	return prisma.users.delete({
		where: { id: id}
	});
}

export const getById = (id: number) => {
	return prisma.users.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			email: true,
			name: true,
			surname: true,
			UserRole: true,
			UserTenantLinks: {
				select: {
					tenants: true
				}
			}
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
		}
	})
}

export const userExists = (email: string) => {
	return prisma.users.findUnique({
		where: {
			email
		},
		include: {
			UserSecurity: true,
			UserTenantLinks: {
				include: {
					tenants: true
				}
			}
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

export const backendRegisterUser = async (parsedBody: BackendRegisterRequest) => {
	return prisma.users.create({
		data: {
			email: parsedBody.email,
			name: parsedBody.name,
			surname: parsedBody.surname,
			
			UserRole: parsedBody.userRole,

			UserSecurity: {
				create: {
					password: await hashSync(parsedBody.password, 10)
				}
			},

			UserTenantLinks: {
				create: {
					tenants: {
						connect: {
							id: parsedBody.tenantId
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

export const search = async (data: UserSearchRequest) => {
	const { searchTerm, page, rows: take, sortBy } = data

	const skip = (page - 1) * take

	const orderBy = sortBy ? sortByFix(sortBy) : {}

	const where = searchTerm ? {
		OR: [
			{ email: { contains: searchTerm } },
			{ name: { contains: searchTerm } },
			{ surname: { contains: searchTerm } }
		]
	} : {}

	const total = await prisma.users.count({ where })
	const records = await prisma.users.findMany({
		where,
		skip,
		take,
		orderBy
	})

	return {
		total,
		records
	}	
}