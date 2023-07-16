import { z } from 'zod'
import { userLogin, UserLoginResponse } from '~/server/models/validation/users'
import { Users } from '@prisma/client'

type userLoginInput = z.infer<typeof userLogin>
interface IUserAuthState {
  userData: Users | null
  token: string | null
  loggedIn: boolean
  isAuthLoading: boolean
  tenantId?: number
}

export const useAuthStore = defineStore('auth', () => {
  const auth =  ref<IUserAuthState>({
    userData: (localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth") as string).userData as Users | null : null,
    token: (localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth") as string).token as string | null : null,
    loggedIn: (localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth") as string).loggedIn as boolean : false,
    isAuthLoading: (localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth") as string).isAuthLoading as boolean : true,
    tenantId: (localStorage.getItem("auth")) ? JSON.parse(localStorage.getItem("auth") as string).tenantId as number : 0,
  })

  const isAuthLoading = computed(() => auth.value.isAuthLoading)
  const loggedIn = computed(() => auth.value.loggedIn)
  const role = computed(() => auth.value.userData?.userRole)
  const tenantId = computed(() => auth.value.tenantId)
  const token = computed(() => auth.value.token)
  const userEmail = computed(() => auth.value.userData?.email)
  const userId = computed(() => auth.value.userData?.id)
  const userName = computed(() => `${auth.value.userData?.name} ${auth.value.userData?.surname}`)

  watch(
    auth,
    (userVal) => {
      localStorage.setItem('auth', JSON.stringify(userVal))
    },
    { deep: true }
  )

  // private
  const setAuthLoading = (value: boolean) => {
    auth.value.isAuthLoading = value
  }

  const login = async (body: userLoginInput): Promise<UserLoginResponse> => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body
      })

      const { token, user, tenantId } = new UserLoginResponse(data as UserLoginResponse)

      if (token) {
        auth.value.userData = user as Users
        auth.value.token = token
        auth.value.loggedIn = true
        auth.value.tenantId = tenantId as number
      }

      return {token, user, tenantId}
    } catch (error) {
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await useFetchApi('/api/auth/logout', { method: 'POST' })

      auth.value.userData = null
      auth.value.token = null
      auth.value.loggedIn = false
    } catch (error) {
      throw error
    }
  }

  const refreshToken = async (): Promise<UserLoginResponse> => {
    try {
      setAuthLoading(true)
      const tokenData = await $fetch('/api/auth/refresh')
      const { token } = tokenData

      if (token) {
        auth.value.token = token
      }

      const userData = await useFetchApi('/api/auth/user') as { user: Users, tenantId: number }
      const { user, tenantId } = userData

      if (user) {
        auth.value.userData = user
        auth.value.loggedIn = true
      }

      if (tenantId) {
        auth.value.tenantId = tenantId
      }
      
      return new UserLoginResponse({token, user, tenantId} as UserLoginResponse)
    } catch (error) {
      logout()
      throw error
    } finally {
      setAuthLoading(false)
    }
  }

  const reset = () => {
    auth.value.userData = null
    auth.value.token = null
  }

  return {
    isAuthLoading,
    loggedIn,
    role,
    tenantId,
    token,
    userEmail,
    userId,
    userName,
    login,
    logout,
    refreshToken,
    reset
  }
})