<template>
  <div class="container" @dblclick="revertMap">
    <div class="chart" id="charts">chart</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { getMap } from '@/api/map'
import { getProvinceMapInfo } from '@/http/map_utils.js'

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
      title: {
        text: '| 商家分布',
        left: 20,
        top: 20
      },
      geo: {
        type: 'map',
        map: 'chinaMap',
        top: '5%',
        bottom: '5%',
        roam: true,
        label: {
          show: true
        },
        itemStyle: {
          areaColor: '#2e72bf',
          borderColor: '#333'
        }
      }
    }
    echart.value.setOption(option)
  } catch (e) {
    console.log(e)
  }

  echart.value.on('click', async (arg: any) => {
    console.log(arg)
    const provinceInfo = getProvinceMapInfo(arg.name)

    try {
      const res = await axios({
        url: 'http://localhost:8080' + provinceInfo.path
      })
      console.log(res)
      proxy.$echarts.registerMap(provinceInfo.key, res.data)
      const option = {
        geo: {
          map: provinceInfo.key
        }
      }

      echart.value.setOption(option)
    } catch (e) {
      console.log(e)
    }
  })
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

// 双击 返回 中国地图
const revertMap = () => {
  echart.value.setOption({
    geo: { map: 'chinaMap' }
  })
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
