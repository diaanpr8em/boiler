import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { getUserTenantById } from '../db/users'

export default defineEventHandler(async (event) => {
	const endpoints = [
		'/api/auth/user',
	]

	const matched = endpoints.some(endpoint => {
		const pattern = new UrlPattern(endpoint)
		return pattern.match(event.node.req.url as string)
	})
	if (!matched) return

	const token = event.node.req.headers['authorization']?.split(' ')[1]

	const decoded = decodeAccessToken(token as string)
	if (!decoded) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
	
	try {
		const { userId } = decoded as JwtPayload
		const user = await getUserTenantById(userId)

		if (!user) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		// https://[abc].talentforge.co.za
		const { Tenants } = user
		if (!Tenants || Tenants.length <= 0 || !Tenants.map(x => x.domain).includes(event.node.req.headers.host ?? '')) {
			return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
		}

		event.context.auth = { user }
	} catch (e) {
		return
	}
})