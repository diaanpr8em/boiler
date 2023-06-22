import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { JwtPayload } from 'jsonwebtoken'
import { getById } from '../db/users'

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
		const user = await getById(userId)
		event.context.auth = { user }
	} catch (e) {
		return
	}
})