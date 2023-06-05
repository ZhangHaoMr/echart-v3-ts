import type { App } from 'vue'
import registerEcharts from './registerEchart'
import registerTheme from './registerTheme'

export const globalRegister = {
  install(app: App) {
    app.use(registerEcharts)
    app.use(registerTheme)
  }
}
