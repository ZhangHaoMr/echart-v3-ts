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
const echart = ref(null)

const resData = ref<any>()

onMounted(() => {
  initCharts()
  getData()
})
// 初始化echarts
const initCharts = () => {
  echart.value = proxy.$echarts.init(document.getElementById('charts'))
  console.log('echart.value', echart.value)
}

// 获取后台返回的图表数据
const getData = async () => {
  try {
    const res = await getSeller()
    resData.value = res
    updataChart()
  } catch (e) {
    console.log(e)
  }
}

// 配置图标 并 配置
const updataChart = () => {
  
}
</script>

<style></style>
