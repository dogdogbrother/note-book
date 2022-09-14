<template>
  <div>
    <span>我是一个比较大的css</span>
  </div>
</template>

<style lang='stylus' scoped>
div
  width 600px
  height 400px
  font-size 60px
  font-weight bold
  color #fff
  text-align center
  line-height 400px
  background linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left center/400% 400%;
  animation: move 10s infinite;

@keyframes move 
  0%,100% 
    background-position-x: left;
  50% 
    background-position-x: right;
</style>