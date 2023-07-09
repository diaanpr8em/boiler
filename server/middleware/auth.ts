import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { getUserAuthDataById } from '../db/users/users'

export default defineEventHandler(async (event) => {
	// these are admin only endpoints
	const adminEndpoints = [
		'/api/tenants',
		'/api/tenants/*'
	]
	const clientAdminEndpoints = [
		'/api/client-admin/*' // this is not actually endpoint, there is ts issue with empty array
	]
	// these are endpoints that require authentication to access
	const endpoints = [
		'/api/auth/user',
		'/api/modules/*',
	]

	const matched = [...endpoints, ...clientAdminEndpoints, ...adminEndpoints].some(endpoint => {
		const pattern = new UrlPattern(endpoint)
		return pattern.match(event.node.req.url as string)
	})
	if (!matched) return

	const token = event.node.req.headers['authorization']?.split(' ')[1]

	const decoded = decodeAccessToken(token as string)
	if (!decoded) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
	
	try {
		const { userId } = decoded as JwtPayload
		const user = await getUserAuthDataById(userId)

		if (!user) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		// if user is not an admin, check if they are allowed to access the endpoint
		let unAuthEndpoints: string[] = [] 
		switch (user.UserRole) {
			case 'USER':
				unAuthEndpoints = [...clientAdminEndpoints, ...adminEndpoints]
				break
			case 'CLIENTADMIN':
				unAuthEndpoints = [...adminEndpoints]
				break;
		}

		if (unAuthEndpoints.some(endpoint => {
			const pattern = new UrlPattern(endpoint)
			return pattern.match(event.node.req.url as string)
		})) {
			return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
		}

		// domain: https://[abc].talentforge.co.za
		// local: http://localhost:3000
		const tenants = user.UserTenantLinks.map(x => x.tenants)

		if (!tenants || tenants.length <= 0) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		const tenant = tenants.find(x => x.domain === event.node.req.headers.host ?? '')

		if (!tenant) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		event.context.auth = { 
			user,
			tenantId: tenant.id,
			role: user.UserRole
		}
	} catch (e) {
		return
	}
})