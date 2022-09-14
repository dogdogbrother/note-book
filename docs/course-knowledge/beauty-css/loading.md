## 心形加载条

> 实现效果利用到上个章节计算相关的知识点

效果如下:

<template>
  <Heartbeat />
</template>

<script>
import Heartbeat from './component/heartbeat'
export default {
  components: {
    Heartbeat
  }
}
</script>

## 功能点总结

### 渐变色
先给元素设置背景色,再利用filter下的`hue-rotate`进行色相旋转.

### 动画效果
给li元素设置个动画名`animation-name: beat-1;`,动画定义如下:
```css
@keyframes beat-1 {
  0%,10%,90%,100% 
    height: 10px;
  45%,55%
    height: 30px;
    transform: translate3d(0, -15px, 0);
}
```
效果是当元素变高的同时也上下移动,做到好像上下一起变长的错觉,并且在45%~55%停顿一下.

### 元素的差异控制
一共是有3种差异,背景色差异和动画的等待时长的差异,可以通过`var()`获取到元素的属性进行计算得出.
```CSS
li {
  --angle: calc(var(--line-index) / 9 * .5turn);
  --time: calc((var(--line-index) - 1) * 40ms);
  background-color: #3c9;
  filter: hue-rotate(var(--angle));
  animation-delay: var(--time);
}
```
> `turn` 是角度单位,`1turn`===`360deg`.

动画差异就不能用`var()`来计算了,只能多顶级一个`@keyframes`动画了.

## 整体代码
<<< ./docs/course-knowledge/beauty-css/component/heartbeat.vue