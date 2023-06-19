import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

const runtimeConfig = useRuntimeConfig()

export const decodeAccessToken = (token: string) => {
	try {
		return jwt.verify(token, runtimeConfig.JWT_SECRET)
	} catch (error)  {
		return null
	}
}
export const decodeRefreshToken = (token: string) => {
	try {
		return jwt.verify(token, runtimeConfig.JWT_REFRESH_SECRET)
	} catch (error)  {
		return null
	}
}


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