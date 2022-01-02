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

