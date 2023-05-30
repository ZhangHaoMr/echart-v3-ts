<template>
  <div class="seller">
    <div class="chart" id="charts">chart</div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue'
import { getSeller } from '@/api/seller'

const { proxy } = getCurrentInstance()

// 保存echarts实例
const echart = ref()
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
})
// 初始化echarts
const initCharts = () => {
  echart.value = proxy.$echarts.init(document.getElementById('charts'), 'dark')
  // console.log('echart.value', echart.value)

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

// 配置图标 并 配置
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
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: nameData
    },
    series: [
      {
        type: 'bar',
        data: valueData
      }
    ],
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

    if (totalPage.value === currentPage.value) {
      currentPage.value = 1
    }
    updataChart()
  }, 3000)
}

window.addEventListener('resize', () => {
  console.log('resize')
})
</script>

<style></style>
