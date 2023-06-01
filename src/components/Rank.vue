<template>
  <div class="container">
    <div class="chart" id="charts">chart</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import { getRank } from '@/api/rank'

const { proxy } = getCurrentInstance()

// 保存echarts实例
const echart = ref()
// 保存所有数据
const resAllData = ref<any>()

// 初始化echarts
const initCharts = async () => {
  echart.value = proxy.$echarts.init(document.getElementById('charts'), 'dark')
  // console.log('echart.value', echart.value)

  const option = {
    title: {
      text: '| 地区销售排行',
      left: 20,
      top: 20
    },
    grid: {
      top: '40%',
      bottom: '5%',
      left: '5%',
      right: '5%',
      containLabel: true
    },
    tooltip: {
      show: true
    }
  }
  echart.value.setOption(option)
}
// 获取后台返回的图表数据
const getData = async () => {
  try {
    const res = await getRank()
    resAllData.value = res

    resAllData.value.sort((a: any, b: any) => {
      return b.value - a.value
    })

    updataChart()
  } catch (e) {
    console.log(e)
  }
}

// 配置图表
const updataChart = () => {
  // 获取所有 x轴 数据
  const xData = resAllData.value.map((item: any) => item.name)
  // 获取所有 y轴 数据
  const yData = resAllData.value.map((item: any) => item.value)

  const colorArr = [
    ['#0BA82C', '#4FF778'], // 300 柱子的颜色
    ['#2E72BF', '#23E5E5'], // 200  柱子的颜色
    ['#5052EE', '#AB6EE5'] // 柱子的颜色
  ]

  // 图标配置
  const option = {
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        data: yData,
        label: {
          show: true,
          position: 'top'
        },
        itemStyle: {
          barBorderRadius: [33, 33, 0, 0],
          color: (arg: any) => {
            let targetColor = colorArr[0]
            if (arg.value >= 300) {
              targetColor = colorArr[0]
            } else if (arg.value >= 200) {
              targetColor = colorArr[1]
            } else {
              targetColor = colorArr[2]
            }
            return new proxy.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: targetColor[0] },
              { offset: 1, color: targetColor[1] }
            ])
          }
        }
      }
    ]
  }
  echart.value.setOption(option)
}

// 图表自适应
const screenAdapter = () => {
  const titleFontSize =
    (document.getElementById('charts').offsetWidth / 100) * 3.6

  const option = {
    title: {
      textStyle: {
        fontSize: titleFontSize / 2
      }
    },
    legend: {
      itemWidth: titleFontSize / 2,
      itemHeight: titleFontSize / 2,
      itemGap: titleFontSize / 2,
      textStyle: {
        fontSize: titleFontSize / 2
      }
    }
  }
  echart.value.setOption(option)

  echart.value.resize()
}

onMounted(() => {
  initCharts()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', screenAdapter)
})
</script>

<style></style>
