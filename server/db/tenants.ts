import { prisma } from './prismaConnection'

export const getTenantByDomain = async (domain: string) => {
    return await prisma.tenants.findFirst({
		where: {
			domain
		}
	})
}