<template>
  <div class="container">
    <div class="chart" id="stock">chart</div>
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
import { getStock } from '@/api/stock'

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

const titleFontSize = ref()

// 初始化echarts
const initCharts = () => {
  // 圆环位置
  const centerPointers = [
    ['18%', '40%'],
    ['50%', '40%'],
    ['82%', '40%'],
    ['34%', '75%'],
    ['66%', '75%']
  ]
  echart.value = proxy.$echarts.init(document.getElementById('stock'), 'chalk')
  // console.log('echart.value', echart.value)

  const option = {
    title: {
      text: '| 库存和销量分析',
      left: 20,
      top: 20,
      textStyle: {
        fontSize: 66
      }
    },
    series: [
      {
        type: 'pie',
        labelLine: { show: false },
        hoverAnimation: false,
        center: centerPointers[0]
      },
      {
        type: 'pie',
        labelLine: { show: false },
        hoverAnimation: false,
        center: centerPointers[1]
      },
      {
        type: 'pie',
        labelLine: { show: false },
        hoverAnimation: false,
        center: centerPointers[2]
      },
      {
        type: 'pie',
        labelLine: { show: false },
        hoverAnimation: false,
        center: centerPointers[3]
      },
      {
        type: 'pie',
        labelLine: { show: false },
        hoverAnimation: false,
        center: centerPointers[4]
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
    const res = await getStock()
    resAllData.value = res

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
  // 圆环颜色
  const colorArrs = [
    ['#4FF778', '#0BA82C'],
    ['#E5DD45', '#E8B11C'],
    ['#E8821c', '#E55445'],
    ['#5052EE', '#AB6EE5'],
    ['#23E5E5', '#2E72BF']
  ]

  // 分页获取数据
  const stant = (currentPage.value - 1) * pageSize.value
  const end = pageSize.value * currentPage.value
  showData.value = resAllData.value.slice(stant, end)

  const seriesArr = showData.value.map((item: any, index) => {
    return {
      data: [
        {
          name: `${item.name} \n\n ${item.sales}`,
          label: {
            show: true,
            position: 'center',
            color: colorArrs[index][0]
          },
          value: item.sales,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: colorArrs[index][0] // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: colorArrs[index][1] // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        {
          value: item.stock,
          itemStyle: {
            color: '#b9b9b9'
          }
        }
      ]
    }
  })
  // 图标配置
  const option = {
    series: seriesArr
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
  titleFontSize.value =
    (document.getElementById('stock').offsetWidth / 100) * 3.6

  const dataOptions = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    series: [
      {
        radius: [titleFontSize.value * 2.8, titleFontSize.value * 2.8 * 1.125],
        label: { fontSize: titleFontSize.value / 2 }
      },
      {
        radius: [titleFontSize.value * 2.8, titleFontSize.value * 2.8 * 1.125],
        label: { fontSize: titleFontSize.value / 2 }
      },
      {
        radius: [titleFontSize.value * 2.8, titleFontSize.value * 2.8 * 1.125],
        label: { fontSize: titleFontSize.value / 2 }
      },
      {
        radius: [titleFontSize.value * 2.8, titleFontSize.value * 2.8 * 1.125],
        label: { fontSize: titleFontSize.value / 2 }
      },
      {
        radius: [titleFontSize.value * 2.8, titleFontSize.value * 2.8 * 1.125],
        label: { fontSize: titleFontSize.value / 2 }
      }
    ]
  }
  echart.value.setOption(dataOptions)

  echart.value.resize()
}

defineExpose({
  screenAdapter
})

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
</script>

<style></style>
