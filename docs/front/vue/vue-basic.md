## ref

`ref()`可以创建一个响应式数据,也可以用于获取`DOM`元素.

### 响应式效果:

<img src="./img/ref-1.gif"/>

代码如下:

```vue
<template>
  <p>{{data.count}}</p>
  <p>{{data.double}}</p>
  <button @click="add">开加</button>
</template>

<script setup lang="ts">
interface DataProps {
  count: number
  double: number
}
import { reactive, computed } from 'vue'

const data: DataProps = reactive({
  count: 1,
  double: computed(() => data.count * 2)
})

function add() {
  data.count++
}
</script>

```
### dome获取

```vue
<template>
  <p ref="refDom">refDom内容</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const refDom: any = ref(null)

onMounted(() => {
  console.log(refDom.value.innerHTML) 
  // 输出 "refDom内容"
}) 
</script>

```
> 写了个丑陋的`any`,后续更懂一点TS再改

## reactive

和ref功能相似,也是创建个响应式数据,但是一般ref会用于创建number,string类型的数据,而reactive是创建对象数据.

响应式效果:

<img src="./img/reactive-1.gif"/>

```vue
<template>
  <p>{{data.count}}</p>
  <p>{{data.double}}</p>
  <button @click="add">开加</button>
</template>

<script setup lang="ts">
interface DataProps {
  count: number
  double: number
}
import { reactive, computed } from 'vue'

const data: DataProps = reactive({
  count: 1,
  double: computed(() => data.count * 2)
})

function add() {
  data.count++
}
</script>
```


