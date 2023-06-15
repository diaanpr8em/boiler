import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

const runtimeConfig = useRuntimeConfig()

const generateAccessToken = (userId: number) => {
	return jwt.sign({ userId }, runtimeConfig.JWT_SECRET, { expiresIn: '15m' })
}

const generateRefreshToken = (userId: number) => {
	return jwt.sign({ userId }, runtimeConfig.JWT_REFRESH_SECRET, { expiresIn: '4h' })
}

export const generateTokens = (userId: number) => {
	const token = generateAccessToken(userId)
	const refreshToken = generateRefreshToken(userId)

	return {
		token,
		refreshToken
	}
}

export const sendRefreshToken = (event: H3Event, token: string) => {
	setCookie(event, 'refreshToken', token, {
		httpOnly: true,
		sameSite: true
	})
}