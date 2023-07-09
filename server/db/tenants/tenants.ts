import { TenantInsertRequest } from '../../models/validation/tenants'
import { prisma } from '../prismaConnection'

export const getTenantByDomain = async (domain: string) => {
    return await prisma.tenants.findFirst({
		where: {
			domain
		}
	})
}

export const getTenantByUserId = async (userId: number) => {
	return await prisma.tenants.findFirst({
		where: {
			UserTenantLinks: {
				every: {
					userId: userId 
				}
			}
		}
	})
}

export const insert = async (data: TenantInsertRequest) => {
	return prisma.tenants.create({
		data
	})
}