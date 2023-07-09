import { UserSecurity, Users } from '@prisma/client'
import { z } from 'zod'

const userResetPass = z.object({
	linkId: z.string(),
	linkType: z.string(),
	password: z.string().min(8).max(100),
	passwordConfirmation: z.string().min(8).max(100),
})

const userForgotPass = z.object({
	email: z.string().email(),
})

const userLogin = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
})

const userRegister = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
	passwordConfirmation: z.string().min(8).max(100),
	name: z.string().min(2).max(100),
	surname: z.string().min(2).max(100),
})

export class UserLoginResponse {
	token: string | undefined
	user: Users & {
		UserSecurity: UserSecurity | null
	} | null = null

	constructor(data?: UserLoginResponse) {
		if (data) {
			Object.assign(this, data)
			if (this.user) {
				this.user.UserSecurity = null
			}
			return
		}

		this.token = ""
		this.user = null
	}
}

export {
	userForgotPass,
	userLogin,
	userRegister,
	userResetPass
}