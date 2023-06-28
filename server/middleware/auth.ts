import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { getUserAuthDataById } from '../db/users'

export default defineEventHandler(async (event) => {
	// these are admin only endpoints
	const adminEndpoints = [
		''
	]
	// these are endpoints that require authentication to access
	const endpoints = [
		'/api/auth/user',
		'/api/modules/contacts/*',
		'/api/modules/contact-groups/*',
		'/api/modules/notifications/*',
		'/api/modules/subscriptions/*',
	]

	const matched = [...endpoints, ...adminEndpoints].some(endpoint => {
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
		if (user.UserRole.map(x => x.role).includes('USER')) {
			// check if the endpoint is an admin endpoint
			if (adminEndpoints.some(endpoint => {
				const pattern = new UrlPattern(endpoint)
				return pattern.match(event.node.req.url as string)
			})) {
				return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
			}
		} 

		// domain: https://[abc].talentforge.co.za
		// local: http://localhost:3000
		const tenants = user.UserTenantLinks.map(x => x.tenants)

		if (!tenants || tenants.length <= 0) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		const tenant = tenants.find(x => x.domain === event.node.req.headers.host ?? '')

		if (!tenant) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		event.context.auth = { 
			user,
			tenant,
			role: user.UserRole.map(x => x.role)[0]
		}
	} catch (e) {
		return
	}
})