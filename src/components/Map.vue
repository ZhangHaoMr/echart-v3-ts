<template>
  <div class="container">
    <div class="chart" id="charts">chart</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { getMap } from '@/api/map'

const { proxy } = getCurrentInstance()

// 保存echarts实例
const echart = ref()
// 保存所有数据
const resAllData = ref<any>()

// 初始化echarts
const initCharts = async () => {
  echart.value = proxy.$echarts.init(document.getElementById('charts'), 'dark')
  // console.log('echart.value', echart.value)

  try {
    const res = await axios.get('http://localhost:8080/map/china.json')
    // console.log(res)

    proxy.$echarts.registerMap('chinaMap', res.data)

    const option = {
      geo: {
        type: 'map',
        map: 'chinaMap',
        roam: true,
        label: {
          show: true
        }
      }
    }
    echart.value.setOption(option)
  } catch (e) {
    console.log(e)
  }
}
// 获取后台返回的图表数据
const getData = async () => {
  try {
    const res = await getMap()
    // console.log(res)
    resAllData.value = res

    updataChart()
  } catch (e) {
    console.log(e)
  }
}

// 配置图表
const updataChart = () => {
  const legendData = resAllData.value.map((item: any) => item.name)

  const seriesArr = resAllData.value.map((item: any) => {
    return {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      name: item.name,
      data: item.children,
      rippleEffect: {
        scale: 10,
        brushType: 'stroke'
      }
    }
  })

  // 图标配置
  const option = {
    // xAxis: {
    //   data: timesArrs
    // },
    // legend: {
    //   data: legendArrs
    // },
    legend: {
      data: legendData,
      left: '5%',
      bottom: '5%',
      orient: 'vertical'
    },
    series: seriesArr
  }
  echart.value.setOption(option)
}

// 图表自适应
const screenAdapter = () => {
  const titleFontSize =
    (document.getElementById('charts').offsetWidth / 100) * 3.6

  const option = {
    legend: {
      itemWidth: titleFontSize,
      itemHeight: titleFontSize,
      itemGap: titleFontSize,
      textStyle: {
        fontSize: titleFontSize
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
