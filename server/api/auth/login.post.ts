import { z } from "zod"
import { UserLoginResponse, userLogin } from "../../models/users"
import { sendError } from 'h3'
import { userExists } from "../../db/users/users"
import { compare } from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt"
import { updateRefreshToken } from "../../db/users/userSecurity"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = userLogin.parse(body)
		
		const user = await userExists(parsedBody.email)

		if (!user) {
			return sendError(event, createError({statusCode: 400, statusMessage: 'Password or Email is invalid'}))
		}

		if (!user.UserSecurity || !user.UserSecurity.password) {
			throw new Error('User is not registered')
		}

		const passwordMatch = await compare(parsedBody.password, user.UserSecurity.password)
		if (!passwordMatch) {
			return sendError(event, createError({statusCode: 400, statusMessage: 'Password or Email is invalid'}))
		}
		
		const { token, refreshToken } = generateTokens(user.id)

		await updateRefreshToken(user.id, refreshToken)
		
		sendRefreshToken(event, refreshToken)

		return new UserLoginResponse({user, token})

	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})