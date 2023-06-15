import { defineStore } from 'pinia'
import { UserLoginResponse } from '~/server/models/users'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useAuthStore = defineStore('auth', {
  // a function that returns a fresh state
  state: (): {userData: UserLoginResponse | null} => ({
    userData: null,
  }),
  // optional getters
  getters: {
		token: (state) => state.userData?.token,
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.userData = null
    },
		setUserData(data: UserLoginResponse) {
			this.userData = data
		}
  },
})