import type { App } from 'vue'
import registerEcharts from './registerEchart'

export const globalRegister = {
  install(app: App) {
    app.use(registerEcharts)
  }
}
