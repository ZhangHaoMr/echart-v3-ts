import * as echarts from 'echarts'
import echartsJson from '@/theme/chalk.json'

export default function registerTheme(): void {
  echarts.registerTheme('chalk', echartsJson)
}
