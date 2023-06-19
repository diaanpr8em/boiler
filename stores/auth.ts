import { z } from 'zod'
import { userLogin, UserLoginResponse } from '~/server/models/users'
import { Users } from '@prisma/client'

type userLoginInput = z.infer<typeof userLogin>
interface IUserAuthState {
  userData: Users | null
  token: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const auth =  ref<IUserAuthState>({
    userData: null,
    token: null
  })

  const token = computed(() => auth.value.token)
  const userId = computed(() => auth.value.userData?.id)
  const userName = computed(() => auth.value.userData?.name)

  watch(
    auth,
    (userVal) => {
      localStorage.setItem('auth', JSON.stringify(userVal))
    },
    { deep: true }
  )

  const login = async (body: userLoginInput): Promise<UserLoginResponse> => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body
      })

      const { token, user } = new UserLoginResponse(data as UserLoginResponse)

      if (token) {
        auth.value.userData = user as Users
        auth.value.token = token
      }

      return {token, user}
    } catch (error) {
      throw error
    }
  }

  const refreshToken = async (): Promise<UserLoginResponse> => {
    try {
      const tokenData = await $fetch('/api/auth/refresh')
      const { token } = tokenData

      if (token) {
        auth.value.token = token
      }

      const userData = await useFetchApi('/api/auth/user') as { user: Users }
      const { user } = userData

      if (user) {
        auth.value.userData = user
      }
  
      return new UserLoginResponse({token, user} as UserLoginResponse)
    } catch (error) {
      throw error;
    }
  }

  const reset = () => {
    auth.value.userData = null
    auth.value.token = null
  }

  return {
    token,
    userId,
    userName,
    login,
    refreshToken,
    reset
  }
})

// export const useAuthStore2 = defineStore('auth', {
//   state: (): IUserAuthState => ({
//     userData: null,
//     token: null
//   }),
//   getters: {
//     getUserData: (state: IUserAuthState) => state.userData,
//     getToken: (state: IUserAuthState) => state.token
//   },
//   actions: {
//     login(body: userLoginInput): Promise<UserLoginResponse> {
//       return new Promise(async (resolve, reject) => {
//         try {
//           const data = await $fetch('/api/auth/login', {
//             method: 'POST',
//             body
//           })
  
//           const { token, user } = new UserLoginResponse(data as UserLoginResponse)
  
//           if (token) {
//             this.userData = user as Users
//           }
  
//           resolve({token, user})
//         } catch (error) {
//           reject(error)
//         }
//       })
//     },
//     reset() {
//       this.userData = null
//       this.token = null
//     },
//   }
// })