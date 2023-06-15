import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useGeneralStore = defineStore('general', {
  // a function that returns a fresh state
  state: () => ({
    drawerIsOpen: true
  }),
  // optional getters
  getters: {
		toggleDrawer: (state) => state.drawerIsOpen = !state.drawerIsOpen
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.drawerIsOpen = false
    },
  },
})