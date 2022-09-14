<script>
import LinearGradient from './component/linear-gradient.vue'
import ClipText from './component/clip-text.vue'
import Grid from './component/grid.vue'
export default {
  components: {
    LinearGradient,
    ClipText,
    Grid
  }
}
</script>

## background-clip 绘制区域

直接写个案例吧,镂空文字.

<template>
  <ClipText />
</template>


css代码如下:
```css
.text {
  background: url('../img/mountain.jpg') center top/auto 150px;
  background-clip: text;
  color: transparent;
}
```

## 渐变

渐变指两种或多种颜色在指定区域内平滑过渡的效果.

* linear-gradient()：线性渐变
* radial-gradient()：径向渐变
* conic-gradient()：锥形渐变
* repeating-linear-gradient()：重复线性渐变
* repeating-radial-gradient()：重复径向渐变
* repeating-conic-gradient()：重复锥形渐变

`CSS`渐变分为三种:

* 线性渐变：沿着指定方向从起点到终点逐渐改变颜色，渐变形状是一条`直线`
* 径向渐变：沿着任意方向从圆心往外面逐渐改变颜色，渐变形状是一个`圆形`或`椭圆形`
* 锥形渐变：沿着顺时针方向从圆心往外面逐渐改变颜色，渐变形状是一个`圆锥体`.(兼容性较差)

### 线性渐变
```txt
background-image: linear-gradient(direction, color-stop)
```
* **Direction**：方向
  - `Keyword`：方向关键字`to left/right/top/bottom/top left/top right/bottom left/bottom right`(默认`to bottom`)
  - `Angle`：角度，以顺时针方向的垂直线与渐变线的夹角计算，超出`N圈`则计算剩余角度
* **ColorStop**：色标,此参数可以写多个,用 `,` 分割即可.
  - `Color`
  - `Position` 

### 线性渐变背景案例1

<template>
  <LinearGradient />
</template>

核心实现代码如下:
```css
.box {
  background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left center/400% 400%;
  animation: move 10s infinite;
}
@keyframes move {
  0%,100% 
    background-position-x: left;
  50% 
    background-position-x: right;
}
```

### 渐变案例2

先看效果:
<template>
  <Grid />
</template>

核心实现代码如下:
```css
.grid {
  background-color: #3c9;
	background-image: linear-gradient(0deg, #fff 5%, transparent 5%, transparent),
		linear-gradient(90deg, #fff 5%, transparent 5%, transparent);
	background-size: 20px 20px;
}
```
写了2个渐变背景图,一个在`0deg`也就是下方,从`0%`到`5%`设置白色,`5%`到`5%`设置透明(也就是没有扩散阴影),后面都是透明的.这样就画出了一条线.2个背景图`background-repeat`,最终就生成如上效果.
