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

const backendRegister = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
	passwordConfirmation: z.string().min(8).max(100),
	name: z.string().min(2).max(100),
	surname: z.string().min(2).max(100),
	tenantId: z.number(),
	userRole: z.enum(['ADMIN', 'CLIENTADMIN', 'USER']).default('USER'),
})

const userSearchSchema = z.object({
	searchTerm: z.string().max(150),
	rows: z.number(),
	page: z.number(),
	sortBy: z.array(
		z.object({
			key: z.string().max(150),
			order: z.string().max(4),
		})
		).optional(),
	})
	
	export class UserLoginResponse {
		token: string | undefined
		user: Users & {
		UserSecurity: UserSecurity | null
	} | null = null
	tenantId: number | undefined
	
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
		this.tenantId = 0
	}
}

export class UserSearchResponse {
	page: number = 0
    rows: number = 10
    total: number = 0
    records: Users[] = []
	
    constructor(data?: UserSearchResponse) {
		if (data) {
			Object.assign(this, data)
            return
        }
    }
}

export {
	backendRegister,
	userForgotPass,
	userLogin,
	userRegister,
	userResetPass,
	userSearchSchema
}

export type UserSearchRequest = z.TypeOf<typeof userSearchSchema>
export type UserRegisterRequest = z.TypeOf<typeof userRegister>;
export type BackendRegisterRequest = z.TypeOf<typeof backendRegister>;