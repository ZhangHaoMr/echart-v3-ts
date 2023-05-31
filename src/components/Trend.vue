<template>
  <div class="container">
    <div class="title" :style="titleStyle">
      <span @click="selectStatus = !selectStatus">
        {{ ' | ' + title }}
      </span>
      <span class="iconfont" :style="titleStyle">&#xe6eb;</span>
      <div class="select" :style="marginStyle" v-if="selectStatus">
        <div
          class="select-item"
          v-for="(item, index) in selectArr"
          :key="index"
          @click="handleSelect(item.key)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="chart" id="charts">chart</div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  computed
} from 'vue'
import { getTrend } from '@/api/trend'

const { proxy } = getCurrentInstance()

// 保存echarts实例
const echart = ref()
// 保存所有数据
const resAllData = ref<any>()

// 控制 下拉选择 显示隐藏
const selectStatus = ref(false)
// const selectArr = ref<any>([])
const dataType = ref('map')

// 动态字体大小
const titleFontSize = ref(0)

// eslint-disable-next-line vue/return-in-computed-property
const selectArr = computed(() => {
  if (!resAllData.value || !resAllData.value.type) {
    return []
  } else {
    return resAllData.value.type.filter((item: any) => {
      return item.key != dataType.value
    })
  }
})

const title = computed(() => {
  if (!resAllData.value) {
    return ''
  } else {
    return resAllData.value[dataType.value].title
  }
})

const titleStyle = computed(() => {
  return { fontSize: titleFontSize.value + 'px' }
})

const marginStyle = computed(() => {
  return { marginLeft: titleFontSize.value / 2 + 'px' }
})

// 初始化echarts
const initCharts = () => {
  echart.value = proxy.$echarts.init(document.getElementById('charts'), 'dark')
  // console.log('echart.value', echart.value)

  const option = {
    title: {
      text: ''
    },
    legend: {
      top: '15%',
      icon: 'circle'
      // left: 20
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid: {
      top: '35%',
      left: '3%',
      right: '4%',
      bottom: '1%',
      containLabel: true
      // show: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: []
  }
  echart.value.setOption(option)
}
// 获取后台返回的图表数据
const getData = async () => {
  try {
    const res = await getTrend()
    console.log(res)

    resAllData.value = res
    updataChart()
  } catch (e) {
    console.log(e)
  }
}

// 配置图表
const updataChart = () => {
  // 获取下拉框 数据
  // selectArr.value = resAllData.value.type

  // 获取 x轴 数据
  const timesArrs = resAllData.value.common.month
  // 获取 y轴 数据
  const valueArrs = resAllData.value[dataType.value].data
  // 获取legend数据
  const legendArrs = valueArrs.map((item: any) => item.name)

  // 半透明颜色
  const colorArr1 = [
    'rgba(11,168,44,0.5)',
    'rgba(44,110,255,0.5)',
    'rgba(22,242,217,0.5)',
    'rgba(254,33,30,0.5)',
    'rgba(250,105,0,0.5)'
  ]
  // 全透明颜色
  const colorArr2 = [
    'rgba(11,168,44,0)',
    'rgba(44,110,255,0)',
    'rgba(22,242,217,0)',
    'rgba(254,33,30,0)',
    'rgba(250,105,0,0)'
  ]

  // 获取 y轴 渲染 数据
  const seriesArrs = valueArrs.map((item: any, index: number) => {
    return {
      name: item.name,
      type: 'line',
      data: item.data,
      stack: dataType.value,
      smooth: true,
      showSymbol: false,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              //offsetParent：获取带有定位的最近父元素
              offset: 0,
              color: colorArr1[index]
            },
            {
              //offsetParent：获取带有定位的最近父元素
              offset: 1,
              color: colorArr2[index]
            }
          ],
          global: false
        }
      }
    }
  })

  // 图标配置
  const option = {
    xAxis: {
      data: timesArrs
    },
    legend: {
      data: legendArrs
    },
    series: seriesArrs
  }
  echart.value.setOption(option)
}

// 图表自适应
const screenAdapter = () => {
  titleFontSize.value =
    (document.getElementById('charts').offsetWidth / 100) * 3.6

  const option = {
    legend: {
      itemWidth: titleFontSize.value,
      itemHeight: titleFontSize.value,
      itemGap: titleFontSize.value,
      textStyle: {
        fontSize: titleFontSize.value
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

// onBeforeUnmount(() => { })

// 切换图表
const handleSelect = (e: any) => {
  selectStatus.value = false
  console.log(e)
  dataType.value = e
  updataChart()
}
</script>

<style>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  color: #fff !important;
  z-index: 100;
  cursor: pointer;
}
</style>
