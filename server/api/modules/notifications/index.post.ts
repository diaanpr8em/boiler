import { z } from "zod"
import { sendError } from 'h3'
import { notificationBundle } from "../../../models/modules/notifications"
import { insertBundle } from "../../../db/modules/notifications"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	try {
		const parsedBody = notificationBundle.parse(body)
		
		const notification = await insertBundle(parsedBody)

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
		
		const { accessToken, refreshToken } = generateTokens(user.id)

		await updateRefreshToken(user.id, refreshToken)
		
		sendRefreshToken(event, refreshToken)

		return {
			token: accessToken,
			user: userTransform(user)
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return sendError(event, createError({statusCode: 400, statusMessage: JSON.stringify(e.flatten())}))
		}

		return sendError(event, createError({statusCode: 500, statusMessage: 'Server Error'}))
	}
})