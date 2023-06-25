import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VDataTableServer } from 'vuetify/labs/VDataTable'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      VDataTableServer
    },
    directives,
    defaults: {
      VTextField: {
        variant: 'outlined'
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})