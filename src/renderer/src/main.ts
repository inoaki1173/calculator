import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import vuetify from '@renderer/plugins/vuetify'

createApp(App).use(vuetify).mount('#app')
