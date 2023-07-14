import { z } from "zod"
import { UserLoginResponse, userLogin } from "../../models/validation/users"
import { sendError } from 'h3'
import { UsersBLL } from "~/server/bll/users/users"
import { compare } from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt"
import { UserSecurityBLL } from "~/server/bll/users/userSecurity"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = userLogin.parse(body)
		
		const user = await UsersBLL.userExists(parsedBody.email)

		if (!user) {
			return sendError(event, createError({statusCode: 400, statusMessage: 'Password or Email is invalid'}))
		}

		const tenants = user.UserTenantLinks.map(x => x.tenants)

		if (!tenants || tenants.length <= 0) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		const tenant = tenants.find(x => x.domain === event.node.req.headers.host ?? '')

		if (!tenant) return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))

		if (!user.UserSecurity || !user.UserSecurity.password) {
			throw new Error('User is not registered')
		}

		const passwordMatch = await compare(parsedBody.password, user.UserSecurity.password)
		if (!passwordMatch) {
			return sendError(event, createError({statusCode: 400, statusMessage: 'Password or Email is invalid'}))
		}
		
		const { token, refreshToken } = generateTokens(user.id)

		await UserSecurityBLL.updateRefreshToken(user.id, refreshToken)
		
		sendRefreshToken(event, refreshToken)

		return new UserLoginResponse({user, token, tenantId: tenant.id})

	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})