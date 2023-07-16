import { prisma } from "../prismaConnection"
import { hashSync } from 'bcrypt'
import { z } from "zod"
import { BackendRegisterRequest, UserRegisterRequest, UserSearchRequest } from "../../models/validation/users"
import { BusinessError, Codes } from "../../models/exceptions/BusinessError"
import { BusinessBase } from "~/server/bll/businessbase"
import { TenantsBLL } from "~/server/bll/tenants/tenants"

class Users {
	deleteById(id: number){
		return prisma.users.delete({
			where: { id: id}
		});
	}

	getById(id: number){
		return prisma.users.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				email: true,
				name: true,
				surname: true,
				userRole: true,
				UserTenantLinks: {
					select: {
						tenants: true
					}
				}
			}
		})
	}

	async getUserAuthDataById(id: number){
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

	userExists(email: string){
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

	async registerUser(parsedBody: UserRegisterRequest, domain: string){
	
		const tenant = await TenantsBLL.getByDomain(domain) 
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
	
	async backendRegisterUser(parsedBody: BackendRegisterRequest){
		return prisma.users.create({
			data: {
				email: parsedBody.email,
				name: parsedBody.name,
				surname: parsedBody.surname,
				
				userRole: parsedBody.userRole,
	
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
	
	async resetPassword(email: string, password: string){
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
	
	async search(data: UserSearchRequest){
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
}

export const UsersDAL = new Users();




