<template>
  <div id="echarts" :style="{width: '500px', height: '200px', border: '1px solid rgba(0, 0, 0, 0.2)'}"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    const chartDom = document.getElementById("echarts")
    const chart = echarts.init(chartDom)
    chart.setOption({
      color: ["#3398DB"],
      xAxis: {
        type: "category",
        data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00"],
        show: false,
      },
      yAxis: {
        show: false
      },
      series: [{
        type: "bar",
        data: [20, 13, 28, 30, 14, 31, 32, 20, 42, 33, 42],
        barWdth: "60%",
      }],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    })
  }
}
</script>