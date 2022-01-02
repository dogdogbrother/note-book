<template>
  <p>{{count}}</p>
  <button @click="add"></button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function add() {
  count.value ++
}
</script>

