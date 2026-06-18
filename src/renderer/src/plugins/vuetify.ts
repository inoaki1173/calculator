import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const theme: ThemeDefinition = {
  dark: false,
  colors: {
    text: '#000000',
    textInversion: '#FFFFFF',
    border: '#808080',
    btnNumber: '#FFFFFF',
    btnOperator: '#A7DBF2',
    btnFunction: '#CCFAFF',
    btnEqual: '#E1F69D',
    btnEffect: '#FF5E5E',
    btnShadow: '#505050',
    background: '#EBECFA'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'theme',
    themes: { theme }
  }
})
