import { z } from 'zod'

import { userLogin } from "~/server/models/users"

type userLoginInput = z.infer<typeof userLogin>

export const useAuth = () => {
	const useAuthToken = () => useState() // todo: shit...need to use pinia or vuex here now instead of useState

	const login = (body: userLoginInput) =>  {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch('/api/auth/login', {
					method: 'POST',
					body
				})
				resolve(data)
				console.log(data)
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		login
	}
}