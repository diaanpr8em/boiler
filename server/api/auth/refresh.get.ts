import { sendError } from 'h3'
import { JwtPayload } from 'jsonwebtoken'
import { getRefreshToken } from '~/server/db/userSecurity'
import { getUserById } from '~/server/db/users'
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {

	try {
		const cToken = getCookie(event, 'refreshToken')		
		if (!cToken) {
			return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
		}

		const dbToken = getRefreshToken(cToken)
		if (!dbToken) {
			return sendError(event, createError({statusCode: 401, statusMessage: 'Unauthorized'}))
		}

		const decodedToken = decodeRefreshToken(cToken) as JwtPayload
		const { userId } = decodedToken
		const { token } = generateTokens(userId)

		return {
			token
		}
	} catch (e) {
		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})