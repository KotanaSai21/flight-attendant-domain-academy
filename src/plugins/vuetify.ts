import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'academy',
    themes: {
      academy: {
        dark: false,
        colors: {
          primary: '#0061AB',
          secondary: '#C01933',
          accent: '#0078D2',
          background: '#F5F7FA',
          surface: '#FFFFFF',
        },
      },
    },
  },
  defaults: {
    VCard: { elevation: 2, rounded: 'lg' },
    VBtn: { rounded: 'lg' },
    VChip: { label: true },
  },
})
