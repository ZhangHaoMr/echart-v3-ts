<template>
  <div class="home">
    <div class="home-top">
      <div class="header">
        <img
          src="https://www.bookbook.cc/vue2/data-view/img/header_border_dark.60ff0f66.png"
          alt=""
        />
      </div>
      <span class="logo">
        <p>bookbook.cc</p>
      </span>
      <span class="title">
        <p>电商平台实时监控系统</p>
      </span>
      <span class="time">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAAE5ElEQVRYR92Xf0zUdRjHX5+7E8oU0JNLCbE0YikmW3+Ym0j90chBC6qVPwriR5u5lVqJP6BSG6jlkl9z4Bxt2RpkdX+x1i81XaJoG3VqAc6fc07/EAXuOLg7P+35ckeId+oBrq3Pxj/H83m+r+f5PM/7+XwUIZbWeizwOlAETBli5gJ+A5qBNuCq//8TgSRgLjAPEB+Dlwf4BihVSp0O9mkV7Eet9X3AC8AmIBEIZtcLCJgb8Pr9WADZ+wAQESLWTqAe2KKUOjPU5pYPaa3F2StACfBICJhQib3b3yUQuz/gdqWUDmy8CUhrHQ3kAKuBqXfrfZh2fcBPwHrguFLqhvgZANJay/kXACuBuGF+JNxtctT7gI+AIwJlAGmtbcAyYDnwYLheR2gvUE3+EmlSWuuHgHf82bGO0Plwt/uAP4EPBegzf938VzCBIARqnwCJHkg3hbV8vhv4fF45bpQy0d3dRWtrO7NnJzNunDTqsNYfArQbyPZrxx29eDwezp45z8GDh2hta6fX3UtkZCSnT5/lUNMBlixeSklJEdEx0rBhrbPANgGaBawBXgqirDd5dLlcVFbUsHNnLZevXMLT5wNlxmwy4/F68PmcxMfPwG7fQ0rKbC5cuEhERARxcZNRKqgGGz0FiECWAnsESCwTgLXAEiAqWFwej5ey0m188ulmQyvmzHmSOSkpjB8/HrPZxLlzkrUD5OflsXr1Ck6cbKWgoACbbQr19V8QGzspmFuBafULpF0p5R6sQ9Jt7wJ5wITBu6VOmo/8TlZ2Np2d11m/7gPeWl7IhAkxhpkE393tpK3tFElJjzF27P00Nv5Ibu4b9PR0s317JYWFOZjN5sFupYj/BoqB75VSIpQ3zyit9WTgbeBNIDaw2+12s3LFWnbt2kFGZhZ1dTVYraKjodf1651s2LCZ6uoKUucv4Dt7AzH9dSVZkfl3zJ+Z/UqpwCy8dWhqrSW3kiWBmiZDsqPjGpmZ2TgcDqqrKln62qtDow1K1tJynPT0hdhsNvb+8gOxNuPY5GbwNbALaFFKSaYGVqhpL337FCAa9cTVqx1kZmThcBynsqqC3NwlmEymO7ZQS4uD9PQMJlknsm//z9j6geTaIgGfGjxUA85Cl37/8X0FPNPT4+b994qpqa3k6bRnqfu8hoSEqbfrHJxOF8XFH1NdvZ3U1DTsxpEZNbdXmkcpdTlYRLcDkkuZ3FsWSFEfbjpG9otZXLvWwcaNZaxatRwRR4fjJNOmxRv1oVBGgTidThoa7BQXr8Pr7aO8vIqcnEVYLHJdYr8f6FK4QDLxBShVNkoXrVlTQnNzM1u3ljFv3lxqa+oorygnMTGJ5ORkxljG4Opx0db2F0ePHsXl6iI/fxlbt2wkKnpATX4FFiulRgYkWerq6jb+bLZYzp+/wMLnnqf91AmUGoPJFGlcHLUGi9mC1WolLz+foqKVRP8LI7GNDtDQ9Hq9Xr7cXc+mTWU8PnMmycmz6OvrM45lxvSHSUubz6OJ0wPHNLje7g2QAIp6OxwniI+PIyoqCo02dMRstmCxmA0IyWy/eA6U670DumPfBzf4fwE1APOHmYlQ2w4Ai4bTZTJsv/U/+kaT6TDwslLqYrg6JJd9mTcZo/g2k6dOI1ColLoSLpC8POXBuGEUn0WSFXkNNwSuG0Oh/gGZwdluiGcpbAAAAABJRU5ErkJggg=="
          alt=""
        />
        <span class="dataTime">2023/6/5 09:01:57</span>
      </span>
    </div>
    <div class="home-content">
      <div class="content-left">
        <div class="left-top">
          <trend />
          <div class="resize">
            <span class="iconfont icon">&#xe826;</span>
          </div>
        </div>
        <div class="left-bottom">
          <seller />
        </div>
      </div>
      <div class="content-center">
        <div class="center-top">
          <Map />
        </div>
        <div class="center-bottom">
          <rank />
        </div>
      </div>
      <div class="content-right">
        <div class="right-top">
          <hot />
        </div>
        <div class="right-bottom">
          <stock />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import trend from './TrendPage.vue'
import seller from './SellerPage.vue'
import Map from './MapPage.vue'
import hot from './HotPage.vue'
import rank from './RankPage.vue'
import stock from './StockPage.vue'
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: black;
  color: #fff;
}

.home-top {
  /* background-color: aqua; */
  position: relative;
  font-size: 20px;
}

.home-top .header img {
  width: 100%;
}

.home-top .logo {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-80%);
}

.home-top .title {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.home-top .time {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-80%);
}

.home-top .time img {
  width: 28px;
  height: 21px;
}

.home-content {
  width: 100%;
  height: 100%;
  /* background-color: cadetblue; */
  box-sizing: border-box;
  margin-top: 10px;
  display: flex;
}

.content-left {
  width: 27.6%;
  height: 100%;
  /* background-color: aquamarine; */
}

.content-left .left-top {
  width: 100%;
  height: 53%;
  /* background-color: brown; */
  position: relative;
}

.resize {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  cursor: pointer;
}

.iconfont {
  font-size: 20px;
}

.content-left .left-bottom {
  margin-top: 25px;
  width: 100%;
  height: 31%;
  position: relative;
  /* background-color: aqua; */
}

.content-center {
  width: 41.5%;
  height: 100%;
  /* background-color: wheat; */
  margin: 0 1.6%;
  position: relative;
}

.content-center .center-top {
  width: 100%;
  height: 56%;
  /* background-color: antiquewhite; */
  position: relative;
}
.content-center .center-bottom {
  margin-top: 25px;
  width: 100%;
  height: 28%;
  position: relative;
  /* background-color: hotpink; */
}

.content-right {
  width: 27.6%;
  height: 100%;
  position: relative;
  /* background-color: burlywood; */
}

.content-right .right-top {
  width: 100%;
  height: 46%;
  position: relative;
  /* background-color: firebrick; */
}

.content-right .right-bottom {
  width: 100%;
  height: 38%;
  position: relative;
  /* background-color: aquamarine; */
  margin-top: 25px;
}
</style>
