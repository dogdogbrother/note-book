```vue
<template>
  
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
```


```vue
<template>
  <HdDialog
    :state="state"
    title="提示"
    width="500px"
    @close="close"
    @submit="submit"
    :loading="loading"
  >
  </HdDialog>
</template>

<script>
export default {
  data() {
    return {
      state: false,
      loading: false
    }
  },
  methods: {
    open() {
      this.state = true
    },
    close() {
      this.state = false
    },
    submit() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
```