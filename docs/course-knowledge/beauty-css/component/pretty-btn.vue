<template>
  <div class="track-btn" 
    @mousemove="mousemove" 
    :style="{'--x': offsetX + 'px', '--y': offsetY + 'px'}">
		<span>我有个摩托车,一个劲的跑</span>
	</div>
</template>

<script>
export default {
  data() {
    return { offsetX: 0, offsetY: 0 }
  },
  methods: {
    mousemove(e) {
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    }
  }
}
</script>

<style lang='stylus' scoped>
.track-btn 
  overflow: hidden;
  position: relative;
  border-radius: 25px;
  width: 400px;
  height: 50px;
  background-color: #66f;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #fff;

.track-btn span
  position: relative;
  pointer-events: none;

.track-btn::before
  --size: 0;
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background-image: radial-gradient(circle closest-side, #09f, transparent);
  content: "";
  transform: translate3d(-50%, -50%, 0);
  transition: width 200ms ease, height 200ms ease;
.track-btn:hover::before
  --size: 400px;


</style>