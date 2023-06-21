export default defineNuxtConfig({
  imports: {
    dirs: ['stores']
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: [
      'defineStore'
    ]
  }
})
