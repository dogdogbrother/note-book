## 成品效果

<template>
  <dome2 ></dome2>
</template>

<script>
import dome2 from './components/bar-chart'
export default {
  components: {
    dome2
  }
}
</script>

代码如下:

<<< ./docs/front/echarts/components/bar-chart.vue
## 初始的option配置

可以看下[echart官网中柱状图的示例](https://echarts.apache.org/examples/zh/editor.html?c=bar-background)

初始option内容如下:
```js
option = {
  xAxis: {
    type: "category",
    data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00"],
    show: false,
  },
  yAxis: {},
  series: [{
    type: "bar",
    data: [20, 13, 28, 30, 14, 31, 32, 20, 42, 33, 42],
  }],
}
```
<img src="./img/demo2-1.png">

## 修正效果

1. 和折线图一样,X轴和Y轴隐藏,grid设置padding.
2. 设置柱状图颜色,`color = ["#3398DB"]`.
3. 设置柱状图宽度小一些,`series.barWdth = "60%"`.