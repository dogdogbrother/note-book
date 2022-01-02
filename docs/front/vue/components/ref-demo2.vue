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

