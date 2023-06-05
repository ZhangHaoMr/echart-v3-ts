<template>
  <div class="container">
    <div class="chart" id="seller">chart</div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  shallowRef
} from 'vue'
import { getSeller } from '@/api/seller'

const { proxy } = getCurrentInstance()

// 保存echarts实例
const echart = shallowRef()
// 保存所有数据
const resAllData = ref<any>()

// 页码
const currentPage = ref(1)
// 条数
const pageSize = ref(5)
// 总条数
const totalPage = ref(0)
// 每页保存的数据
const showData = ref([])

// 保存定时器
let timerId = ref<number>()

onMounted(() => {
  initCharts()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})

// 组件销毁时 清除定时器
onBeforeUnmount(() => {
  clearInterval(timerId.value)
  window.removeEventListener('resize', screenAdapter)
})

// 初始化echarts
const initCharts = () => {
  echart.value = proxy.$echarts.init(document.getElementById('seller'), 'chalk')
  // console.log('echart.value', echart.value)

  const option = {
    title: {
      text: '| 商家销量排行',
      left: 20,
      top: 20,
      textStyle: {
        fontSize: 66
      }
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 66,
        itemStyle: {
          barBorderRadius: [0, 33, 33, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#4e53db' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#8a6fb7' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        label: {
          show: true,
          position: 'right'
        }
      }
    ]
  }
  echart.value.setOption(option)
  echart.value.on('mouseover', () => {
    clearInterval(timerId.value)
  })
  echart.value.on('mouseout', () => {
    startInterval()
  })
}

// 获取后台返回的图表数据
const getData = async () => {
  try {
    const res = await getSeller()
    resAllData.value = res
    // 从小到大排序
    resAllData.value.sort((a: any, b: any) => {
      return b.value - a.value
    })

    totalPage.value =
      resAllData.value.length % 5 === 0
        ? resAllData.value.length / 5
        : resAllData.value.length / 5 + 1

    updataChart()
    startInterval()
  } catch (e) {
    console.log(e)
  }
}

// 配置图标 并 配置分页
const updataChart = () => {
  // 分页获取数据
  const stant = (currentPage.value - 1) * pageSize.value
  const end = pageSize.value * currentPage.value
  showData.value = resAllData.value.slice(stant, end)

  // 获取所有name数据
  const nameData = showData.value.map((item: any) => item.name)
  // 获取所有value数据
  const valueData = showData.value.map((item: any) => item.value)
  // 图标配置
  const option = {
    yAxis: {
      data: nameData
    },
    series: [
      {
        data: valueData
      }
    ]
  }
  echart.value.setOption(option)
}

// 动态加载分页数据
const startInterval = () => {
  if (timerId.value) {
    clearInterval(timerId.value)
  }
  timerId.value = setInterval(() => {
    currentPage.value++

    updataChart()
    if (totalPage.value === currentPage.value) {
      currentPage.value = 1
    }
  }, 3000)
}

// 图表自适应
const screenAdapter = () => {
  const titleFontSize =
    (document.getElementById('seller').offsetWidth / 100) * 3.6

  const dataOptions = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
        }
      }
    ]
  }
  echart.value.setOption(dataOptions)

  echart.value.resize()
}

defineExpose({
  screenAdapter
})
</script>

<style></style>
