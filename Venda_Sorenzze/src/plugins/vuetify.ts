/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons:{
    defaultSet: 'md',
    aliases,
    sets:{
      md
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#7286d3',
          secondary: '#e5e0ff',
        },
      },
    },
  },
})
