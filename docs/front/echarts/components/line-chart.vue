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
      xAxis: {
        type: "category",
        show: false,
        boundaryGap: false
      },
      yAxis: {
        show: false
      },
      series: [{
        type: "line",
        data: [20, 13, 28, 30, 14, 31, 32, 20],
        areaStyle: {
          color: "purple"
        },
        lineStyle: {
          width: 0
        },
        itemStyle: {
          opacity: 0
        },
        smooth: true
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