import { TenantInsertRequest, TenantSearchRequest, TenantUpdateRequest } from '~/server/models/validation/tenants'
import { prisma } from '../prismaConnection'

export const deleteById = (id: number) => {
    return prisma.tenants.delete({
        where: { id: id}
    });
};

export const getAll = async () => {
	return prisma.tenants.findMany()
}

export const getTenantByDomain = async (domain: string) => {
    return await prisma.tenants.findFirst({
		where: {
			domain
		}
	})
}

export const getById = async (id: number) => {
	return await prisma.tenants.findFirst({
		where: {
			id
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

export const search = async (data: TenantSearchRequest) => {
	const { searchTerm, page, rows: take, sortBy } = data

	const skip = (page - 1) * take

	const orderBy = sortBy ? sortByFix(sortBy) : {}

	const where = searchTerm ? {
		OR: [
			{ name: { contains: searchTerm } },
			{ domain: { contains: searchTerm } }
		]
	} : {}

	const total = await prisma.tenants.count({ where })
	const records = await prisma.tenants.findMany({
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

export const update = async (data: TenantUpdateRequest) => {
	const { id } = data
	return prisma.tenants.update({
		where: { id },
		data
	})
}