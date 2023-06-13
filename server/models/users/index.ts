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

export {
	userLogin,
	userRegister
}