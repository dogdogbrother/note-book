## 文本超出省略号显示
```css
.box{
  text-overflow:ellipsis;
  overflow: hidden;
  white-space:nowrap;
}
```
## flex 相关

### flex-direction

**属性决定主轴的方向（即项目的排列方向）。**

它可能有4个值:

* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

### flex-wrap

**如果一条轴线排不下，定义如何换行**

* nowrap（默认）：不换行
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方

### justify-content

**属性定义了项目在主轴上的对齐方式。**

* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-self

**属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性**

```css
.box{
  display: flex;
  justify-content: flex-start;
}
.item {
  align-self:: flex-end;
}
```

### flex-shrink

**shrink 缩小. 指定子元素的缩小占比为,默认是1. 意思是当子元素遭到挤压的时候,可以通过设置 `shrink` 会有不同的缩小比例.**

如果设置为0代表不会被缩小.