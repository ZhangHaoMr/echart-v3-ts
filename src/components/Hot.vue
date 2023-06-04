<template>
  <div class="container">
    <div class="chart" id="charts">chart</div>
    <span class="iconfont arr_left" :style="customStyle" @click="handleToLeft">
      &#xe6ef;
    </span>
    <span
      class="iconfont arr_right"
      :style="customStyle"
      @click="handleToRight"
    >
      &#xe6ed;
    </span>
    <span class="cat_name">{{ catName }}</span>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  computed
} from 'vue'
import { getHot } from '@/api/hot'

const { proxy } = getCurrentInstance()

// 保存echarts实例
const echart = ref()

// 保存所有数据
const resAllData = ref<any>()

const currentIndex = ref(0)

const titleFontSize = ref()

// 初始化echarts
const initCharts = () => {
  echart.value = proxy.$echarts.init(document.getElementById('charts'), 'dark')
  // console.log('echart.value', echart.value)

  const option = {
    title: {
      text: '| 热销商品占比',
      left: 20,
      top: 20
    },
    legend: {
      top: '10%',
      icon: 'circle'
    },
    series: [
      {
        type: 'pie',
        label: {
          show: true,
          formatter: '{b} {d}%'
        },
        labelLine: {
          show: true
        }
      }
    ]
  }
  echart.value.setOption(option)
}
// 获取后台返回的图表数据
const getData = async () => {
  try {
    const res = await getHot()
    // console.log(res)
    resAllData.value = res
    // console.log(resAllData.value)

    updataChart()
  } catch (e) {
    console.log(e)
  }
}

// 配置图表
const updataChart = () => {
  const seriesArr = resAllData.value[currentIndex.value]?.children.map(
    (item: any) => {
      return {
        name: item.name,
        value: item.value,
        children: item.children
      }
    }
  )
  // console.log('seriesArr', seriesArr)

  // 图标配置
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const arr: string[] = []
        params.data.children.map((item) => {
          let childStr = `${item.name}&nbsp;&nbsp;&nbsp; ${(
            (item.value / params.value) *
            100
          ).toFixed(2)}%`
          arr.push(childStr)
        })
        return arr.join('<br/>')
      }
    },
    series: [
      {
        data: seriesArr
      }
    ]
  }
  echart.value.setOption(option)
}

// 图表自适应
const screenAdapter = () => {
  titleFontSize.value =
    (document.getElementById('charts').offsetWidth / 100) * 3.6

  const option = {
    title: {
      textStyle: {
        fontSize: titleFontSize.value / 2
      }
    },
    legend: {
      itemWidth: titleFontSize.value / 2,
      itemHeight: titleFontSize.value / 2,
      itemGap: titleFontSize.value / 2,
      textStyle: {
        fontSize: titleFontSize.value / 2
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        radius: titleFontSize.value * 4.5,
        center: ['50%', '60%']
      }
    ]
  }
  echart.value.setOption(option)

  echart.value.resize()
}

const customStyle = computed(() => {
  return { fontSize: titleFontSize.value + 'px' }
})

const handleToLeft = () => {
  currentIndex.value--

  if (currentIndex.value < 0) {
    currentIndex.value = resAllData.value.length - 1
  }
  updataChart()
}
const handleToRight = () => {
  currentIndex.value++

  if (currentIndex.value > resAllData.value.length - 1) {
    currentIndex.value = 0
  }
  updataChart()
}

const catName = computed(() => {
  if (!resAllData.value) {
    return ''
  } else {
    return resAllData.value[currentIndex.value].name
  }
})

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

<style>
.arr_left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.arr_right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.iconfont {
  color: #fff;
  font-size: 50px;
}

.cat_name {
  position: absolute;
  left: 80%;
  bottom: 10%;
  font-weight: bold;
  color: #fff;
}
</style>
