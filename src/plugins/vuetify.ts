import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
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
  },
})
