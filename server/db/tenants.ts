import { TenantInsertRequest } from '../models/tenants'
import { prisma } from './prismaConnection'

export const getTenantByDomain = async (domain: string) => {
    return await prisma.tenants.findFirst({
		where: {
			domain
		}
	})
}

export const insert = async (data: TenantInsertRequest) => {
	return prisma.tenants.create({
		data
	})
}