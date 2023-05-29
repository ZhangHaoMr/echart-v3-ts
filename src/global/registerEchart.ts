import * as echarts from 'echarts'
import type { App } from 'vue'

export default function registerEcharts(app: App): void {
  app.config.globalProperties.$echarts = echarts
}
