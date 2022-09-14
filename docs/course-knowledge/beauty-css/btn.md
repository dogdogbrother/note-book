## 鼠标跟踪的按钮

效果如下:

<template>
  <PrettyBtn></PrettyBtn>
</template>

<script>
import PrettyBtn from './component/pretty-btn.vue'
export default {
  components: {
    PrettyBtn
  }
}
</script>

## 功能点总结

鼠标光晕实现是利用径向渐变[radial-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient).

1. 给元素增加鼠标事件,记录鼠标的X和Y的位置数据,挂载元素上,作为`var()`标量用.
2. 给`button`的before增加个光晕元素,hover时控制此元素大小,并增加`transition`动画.

## 整体代码
<<< ./docs/course-knowledge/beauty-css/component/pretty-btn.vue



