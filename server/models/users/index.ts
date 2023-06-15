import { UserSecurity, Users } from '@prisma/client'
import { z } from 'zod'

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
		UserSecurity: UserSecurity | undefined
	} | undefined

	constructor(data?: UserLoginResponse) {
		if (data) {
			Object.assign(this, data)
			delete this.user?.UserSecurity
			return
		}

		this.token = ""
		this.user = undefined
	}
}

export {
	userLogin,
	userRegister
}