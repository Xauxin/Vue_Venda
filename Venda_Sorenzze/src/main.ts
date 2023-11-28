

//custom icons

import whatsAppIcon from '@/assets/CustomIcons/whatsAppIcon.vue'
import CreditCard from '@/assets/CustomIcons/CreditCard.vue'

/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'




const app = createApp(App)
app.component('WhatsIcon', whatsAppIcon)
app.component('CreditCardIcon', CreditCard)
registerPlugins(app)


app.mount('#app')
